const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiService = {
  getOpenAiQuestions: async (data) => {
    const number = data.number;
    const field = data.field;
    console.log(number, field);

    const prompt = `
    tạo một mảng JSON có tên là questions cho ${number} câu hỏi trong lĩnh vực ${field}, 
    trong đó liệt kê một tập hợp các đối tượng con có cấu trúc JSON:
    {
      "question": "câu hỏi",
      "answers": ["câu trả lời 1", "câu trả lời 2", "câu trả lời 3", "câu trả lời 4"],
      "correct": "câu trả lời đúng bằng số dựa trên index (0-3) của mảng answers",
      "explanation": "Giải thích cho câu hỏi này"
    }
     Trả về kết quả dưới dạng JSON.
     Hãy trả lời bằng tiếng Việt
    `;
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
      // model: "gpt-4-turbo",

      // max_tokens: 100,
      temperature: 0.2,
      top_p: 0.8,
      response_format: { type: "json_object" },
    });
    // console.log(completion);
    const parsableJSONresponse = completion.choices[0].message.content;
    const parsedResponse = JSON.parse(parsableJSONresponse);
    // console.log(parsedResponse);
    return { result: parsedResponse };
  },
};

module.exports = openaiService;
