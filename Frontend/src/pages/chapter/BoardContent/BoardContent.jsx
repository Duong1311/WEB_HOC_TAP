/* eslint-disable react/prop-types */
import ListChapters from "./ListChapters/ListChapters";
import { mapOrder } from "~/utils/sorts";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision,
} from "@dnd-kit/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import Chapter from "./ListChapters/Chapter/Chapter";
import Lesson from "./ListChapters/Chapter/ListLessons/Lesson/Lesson";
import { cloneDeep, isEmpty } from "lodash";
import { generatePlaceholderlesson } from "~/utils/formatters";

const ACTIVE_DRAG_ITEM_TYPE = {
  chapter: "ACTIVE_DRAG_ITEM_TYPE_chapter",
  lesson: "ACTIVE_DRAG_ITEM_TYPE_lesson",
};

function BoardContent({
  course,
  addNewChapterApi,
  addNewLessonApi,
  moveChapter,
  moveLessonInOneChapter,
  deleteChapterApi,
  updateChapterTitleApi,
  deleteLessonApi,
}) {
  // https://docs.dndkit.com/api-documentation/sensors
  // Nếu dùng PointerSensor mặc định thì phải kết hợp thuộc tính CSS touch-action: none ở trong phần tử kéo thả - nhưng mà còn bug

  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10
  //   }
  // })

  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  // Nhấn giữ 250ms (delay) và dung sai (tolerance) của cảm ứng 500px (dễ hiểu là di chuyển/chênh lệch 5px) thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });

  // Ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất, không bị bug
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedchapters, setOrderedchapters] = useState([]);

  // Cùng một thời điểm chỉ có một phần tử đang được kéo (chapter hoặc lesson)
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldchapterWhenDragginglesson, setOldchapterWhenDragginglesson] =
    useState(null);

  // Điểm va chạm cuối cùng trước đó (xử lý thuật toán phát hiện va chạm, video 37)
  const lastOverId = useRef(null);

  useEffect(() => {
    setOrderedchapters(
      mapOrder(course?.chapters, course?.chapterOrderIds, "_id")
    );
  }, [course]);

  // Tìm một cái chapter theo lessonId
  const findchapterBylessonId = (lessonId) => {
    // Đoạn này cần lưu ý, nên dùng c.lessons thay vì c.lessonOrderIds bởi vì ở bước handleDragOver chúng ta sẽ làm dữ liệu cho lessons hoàn chỉnh trước rồi mới tạo ra lessonOrderIds mới.
    return orderedchapters.find((chapter) =>
      chapter?.lessons?.map((lesson) => lesson._id)?.includes(lessonId)
    );
  };

  // Function chung xử lý việc cập nhật lại state trong trường hợp di chuyển lesson giữa các chapter khác nhau
  const movelessonBetweenDifferentchapters = (
    overchapter,
    overlessonId,
    active,
    over,
    activechapter,
    activeDragginglessonId,
    activeDragginglessonData
  ) => {
    setOrderedchapters((prevchapters) => {
      // Tìm vị trí (index) của cái overlesson trong chapter đích (nơi activelesson sắp được thả)
      const overlessonIndex = overchapter?.lessons?.findIndex(
        (lesson) => lesson._id === overlessonId
      );

      // Logic tính toán "lessonIndex mới" (trên hoặc dưới overlesson) lấy chuẩn ra từ code của thư viện - nhiều khi muốn từ chối hiểu =))
      let newlessonIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      newlessonIndex =
        overlessonIndex >= 0
          ? overlessonIndex + modifier
          : overchapter?.lessons?.length + 1;

      // Clone mảng OrderedchaptersState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedchaptersState mới
      const nextchapters = cloneDeep(prevchapters);
      const nextActivechapter = nextchapters.find(
        (chapter) => chapter._id === activechapter._id
      );
      const nextOverchapter = nextchapters.find(
        (chapter) => chapter._id === overchapter._id
      );

      // nextActivechapter: chapter cũ
      if (nextActivechapter) {
        // Xoá lesson ở cái chapter active (cũng có thể là chapter cũ, cái lúc mà kéo lesson ra khỏi nó để sang chapter khác)
        nextActivechapter.lessons = nextActivechapter.lessons.filter(
          (lesson) => lesson._id !== activeDragginglessonId
        );

        // Thêm Placeholder lesson nếu chapter rỗng: Bị kéo hết lesson đi, không còn cái nào nữa. (Video 37.2)
        if (isEmpty(nextActivechapter.lessons)) {
          nextActivechapter.lessons = [
            generatePlaceholderlesson(nextActivechapter),
          ];
        }

        // Cập nhật lại mảng lessonOrderIds cho chuẩn dữ liệu
        nextActivechapter.lessonOrderIds = nextActivechapter.lessons.map(
          (lesson) => lesson._id
        );
      }

      // nextOverchapter: chapter mới
      if (nextOverchapter) {
        // Kiểm tra xem cái lesson đang kéo nó có tồn tại ở overchapter chưa, nếu có thì cần xoá nó trước
        nextOverchapter.lessons = nextOverchapter.lessons.filter(
          (lesson) => lesson._id !== activeDragginglessonId
        );

        // Phải cập nhật lại chuẩn dữ liệu chapterId trong lesson sau khi kéo lesson giữa 2 chapter khác nhau
        const rebuild_activeDragginglessonData = {
          ...activeDragginglessonData,
          chapterId: nextOverchapter._id,
        };

        // Tiếp theo là thêm cái lesson đang kéo vào overchapter theo vị trí index mới
        nextOverchapter.lessons = nextOverchapter.lessons.toSpliced(
          newlessonIndex,
          0,
          rebuild_activeDragginglessonData
        );

        // Xoá cái Placeholder lesson đi nếu nó đang tồn tại (Video 37.2)
        nextOverchapter.lessons = nextOverchapter.lessons.filter(
          (lesson) => !lesson.FE_Placeholderlesson
        );

        // Cập nhật lại mảng lessonOrderIds cho chuẩn dữ liệu
        nextOverchapter.lessonOrderIds = nextOverchapter.lessons.map(
          (lesson) => lesson._id
        );
      }

      return nextchapters;
    });
  };

  // Trigger khi bắt đầu kéo (drap) một phần tử
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.chapterId
        ? ACTIVE_DRAG_ITEM_TYPE.lesson
        : ACTIVE_DRAG_ITEM_TYPE.chapter
    );
    setActiveDragItemData(event?.active?.data?.current);

    // Nếu là kéo lesson thì mới thực hiện hành động set giá trị oldchapter
    if (event?.active?.data?.current?.chapterId) {
      setOldchapterWhenDragginglesson(findchapterBylessonId(event?.active?.id));
    }
  };

  // Trigger trong quá trình kéo (drag) một phần tử
  const handleDragOver = (event) => {
    // Không làm gì thêm nếu đang kéo chapter
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.chapter) return;

    // Còn nếu kéo lesson thì xử lý thêm để có thể kéo lesson qua lại giữa các chapters
    // console.log('handleDragOver', event)
    const { active, over } = event;

    // Cần đảm bảo nếu không tồn tại active hoặc over (khi kéo ra khỏi phạm vi container) thì không làm gì (tránh crash trang)
    if (!active || !over) return;

    // activeDragginglesson: Là cái lesson đang được kéo
    const {
      id: activeDragginglessonId,
      data: { current: activeDragginglessonData },
    } = active;

    // overlesson: là cái lesson đang tương tác trên hoặc dưới so với cái lesson được kéo ở trên
    const { id: overlessonId } = over;

    // Tìm 2 cái chapter theo cái lessonId
    const activechapter = findchapterBylessonId(activeDragginglessonId);
    const overchapter = findchapterBylessonId(overlessonId);

    // Nếu không tồn tại 1 trong 2 chapter thì không làm gì hết, tránh crash trang web
    if (!activechapter || !overchapter) return;

    // Xử lý logic ở đây chỉ khi kéo lesson qua 2 chapter khác nhau, còn nếu kéo lesson trong chính chapter ban đầu của nó thì không làm gì
    // Vì đây đang làm đoạn xử lý lúc kéo (handleDragOver), còn xử lý lúc kéo xong xuôi thì nó lại là vấn đề khác ở (handleDragEnd)
    if (activechapter._id !== overchapter._id) {
      movelessonBetweenDifferentchapters(
        overchapter,
        overlessonId,
        active,
        over,
        activechapter,
        activeDragginglessonId,
        activeDragginglessonData
      );
    }
  };

  // Trigger khi kết thúc hành động kéo một phần tử => hành động thả (drop)
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Cần đảm bảo nếu không tồn tại active hoặc over (khi kéo ra khỏi phạm vi container) thì không làm gì (tránh crash trang)
    if (!active || !over) return;

    // Xử lý kéo thả lessons
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.lesson) {
      // activeDragginglesson: Là cái lesson đang được kéo
      const {
        id: activeDragginglessonId,
        data: { current: activeDragginglessonData },
      } = active;

      // overlesson: là cái lesson đang tương tác trên hoặc dưới so với cái lesson được kéo ở trên
      const { id: overlessonId } = over;

      // Tìm 2 cái chapter theo cái lessonId
      const activechapter = findchapterBylessonId(activeDragginglessonId);
      const overchapter = findchapterBylessonId(overlessonId);

      // Nếu không tồn tại 1 trong 2 chapter thì không làm gì hết, tránh crash trang web
      if (!activechapter || !overchapter) return;

      // Hành động kéo thả lesson giữa 2 chapter khác nhau
      // Phải dùng tới activeDragItemData.chapterId hoặc oldchapterWhenDragginglesson._id (set vào state từ bước handleDragStart) chứ không phải activeData trong scope handleDragEnd này vì sau khi đi qua onDragOver tới đây là state của lesson đã bị cập nhật một lần rồi
      if (oldchapterWhenDragginglesson._id !== overchapter._id) {
        movelessonBetweenDifferentchapters(
          overchapter,
          overlessonId,
          active,
          over,
          activechapter,
          activeDragginglessonId,
          activeDragginglessonData
        );
      } else {
        // Hành động kéo thả lesson trong cùng 1 cái chapter

        // Lấy vị trí cũ (từ thằng oldchapterWhenDragginglesson)
        const oldlessonIndex = oldchapterWhenDragginglesson?.lessons?.findIndex(
          (c) => c._id === activeDragItemId
        );
        // Lấy vị trí cũ (từ thằng over)
        const newlessonIndex = overchapter?.lessons?.findIndex(
          (c) => c._id === overlessonId
        );

        // Dùng arrayMove vì kéo lesson trong một cái chapter thì tương tự với logic kéo chapter trong một cái board content
        const dndOrderedlessons = arrayMove(
          oldchapterWhenDragginglesson?.lessons,
          oldlessonIndex,
          newlessonIndex
        );

        const dndOrderedlessonsIds = dndOrderedlessons.map(
          (lesson) => lesson._id
        );

        setOrderedchapters((prevchapters) => {
          // Clone mảng OrderedchaptersState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedchaptersState mới
          const nextchapters = cloneDeep(prevchapters);

          // Tìm tới chapter mà chúng ta đang thả
          const targetchapter = nextchapters.find(
            (chapter) => chapter._id === overchapter._id
          );

          // Cập nhật lại 2 giá trị mới là lesson và lessonOrderIds trong cái targetchapter
          targetchapter.lessons = dndOrderedlessons;
          targetchapter.lessonOrderIds = dndOrderedlessonsIds;

          // Trả về giá trị state mới (chuẩn vị trí)
          return nextchapters;
        });
        moveLessonInOneChapter(
          dndOrderedlessons,
          dndOrderedlessonsIds,
          oldchapterWhenDragginglesson._id
        );
      }
    }

    // Xử lý kéo thả chapters trong một cái boardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.chapter) {
      // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
      if (active.id !== over.id) {
        // Lấy vị trí cũ (từ thằng active)
        const oldchapterIndex = orderedchapters.findIndex(
          (c) => c._id === active.id
        );
        // Lấy vị trí cũ (từ thằng over)
        const newchapterIndex = orderedchapters.findIndex(
          (c) => c._id === over.id
        );

        // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng chapter ban đầu
        // Code của arrayMove ở đây: dnd-kit/packages/sortable/src/utilities/arrayMove.ts
        const dndOrderedchapters = arrayMove(
          orderedchapters,
          oldchapterIndex,
          newchapterIndex
        );
        // Cập nhật state chapters ban đầu sau khi đã kéo thả

        setOrderedchapters(dndOrderedchapters);

        // 2 cái console.log dữ liệu này sau dùng để xử lý gọi API
        // const dndOrderedchaptersIds = dndOrderedchapters.map((c) => c._id)
        // console.log('dndOrderedchapters', dndOrderedchapters)
        // console.log('dndOrderedchaptersIds', dndOrderedchaptersIds)

        moveChapter(dndOrderedchapters);
      }
    }

    // Những hành động sau khi kéo thả này luôn phải đưa về giá trị null mặc định ban đầu
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldchapterWhenDragginglesson(null);
  };

  /**
   * Animation khi thả (Drop) phần tử - Test bằng cách kéo xong thả trực tiếp và nhìn phần giữ chỗ Overlay (video 32)
   */
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  // Chúng ta sẽ custom lại chiến lược / thuật toán phát hiện va chạm tối ưu cho việc kéo thả lesson giữa nhiều chapters (video 37 fix bug quan trọng)
  //  args = arguments = Các đối số, tham số
  const collisionDetectionStrategy = useCallback(
    // Trường hợp kéo chapter thì dùng thuật toán closestCorners là chuẩn nhất
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.chapter) {
        return closestCorners({ ...args });
      }

      // Tìm các điểm giao nhau, va chạm, trả về một mảng các va chạm - intersections với con trỏ
      const pointerIntersections = pointerWithin(args);

      // Video 37.1: Nếu pointerIntersections là mảng rỗng, return luôn không làm gì hết
      // Fix triệt để cái bug flickering của thư viện Dnd-kit trong trường hợp sau:
      // - Kéo một cái lesson có image cover lớn và kéo lên phía trên cùng ra khỏi khu vực kéo thả
      if (!pointerIntersections?.length) return;

      // Thuật toán phát hiện va chạm sẽ trả về một mảng các va chạm ở đây (không cần bước này nữa - video 37.1)
      // const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args)

      // Tìm overId đầu tiên trong đám intersection ở trên
      let overId = getFirstCollision(pointerIntersections, "id");
      if (overId) {
        // Video 37: Đoạn này để fix cái vụ flickering nhé
        // Nếu cái over nó là chapter thì sẽ tìm tới cái lessonId gần nhất bên trong khu vực va chạm đó dựa vào thuật toán phát hiện va chạm closestCenter hoặc closestCorners đều được. Tuy nhiên ở đây dùng closestCorners mình thấy mượt mà hơn
        const checkchapter = orderedchapters.find(
          (chapter) => chapter._id === overId
        );
        if (checkchapter) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overId &&
                  checkchapter?.lessonOrderIds?.includes(container.id)
                );
              }
            ),
          })[0]?.id;
        }

        lastOverId.current = overId;
        return [{ id: overId }];
      }

      // Nếu overId là null thì trả về mảng rỗng - tránh bug crash trang
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedchapters]
  );

  return (
    <div>
      <div>
        <div className="font-bold text-2xl mb-5 mt-5 truncate max-w-[800px]">
          {course?.title}
        </div>
      </div>
      <DndContext
        // Cảm biến (đã giải thích kỹ ở video số 30)
        sensors={sensors}
        // Thuật toán phát hiện va chạm (nếu không có nó thì lesson với cover lớn sẽ không kéo qua chapter được vì lúc này nó đang bị conflict giữa lesson và chapter), chúng ta sẽ dùng closestCorners thay vì closestCenter
        // https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
        // Update video 37: nếu chỉ dùng closestCorners sẽ có bug flickering + sai lệch dữ liệu (vui lòng xem video 37 sẽ rõ)
        // collisionDetection={closestCorners}

        // Tự custom nâng cao thuật toán phát hiện va chạm (video fix bug số 37)
        collisionDetection={collisionDetectionStrategy}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className=" flex h-auto min-w-[800px] max-w-[800px] ">
          <ListChapters
            chapters={orderedchapters}
            addNewChapterApi={addNewChapterApi}
            addNewLessonApi={addNewLessonApi}
            deleteChapterApi={deleteChapterApi}
            updateChapterTitleApi={updateChapterTitleApi}
            deleteLessonApi={deleteLessonApi}
          />
          <DragOverlay dropAnimation={customDropAnimation}>
            {!activeDragItemType && null}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.chapter && (
              <Chapter chapter={activeDragItemData} />
            )}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.lesson && (
              <Lesson lesson={activeDragItemData} />
            )}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
}

export default BoardContent;
