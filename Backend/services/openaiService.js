const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: "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",
});

const openaiService = {
  getOpenAiQuestions: async (data) => {
    try {
      const number = data.number;
      const field = data.field;
      // const prompt = `

      //        You will write JSON for 2 questions in the IT field with the JSON structure:

      //     {
      //       "question": "question",
      //       "answers": ["answer1", "answer2", "answer3", "answer4"],
      //       "correct": "correct answer index (0-3)",
      //       "explanation": "explanation"
      //     }

      //     Please answer in Vietnamese

      //     `;
      //   const prompt = `
      // create a JSON array for ${number} questions in the IT field, which enumerates a set of child objects with the JSON structure:
      // {
      //   "question": "question",
      //   "answers": ["answer1", "answer2", "answer3", "answer4"],
      //   "correct": "correct answer index (0-3)",
      //   "explanation": "explanation"
      // }
      // Return the output as JSON.
      // Please answer in Vietnamese
      // `;
      const prompt = `
    tạo một mảng JSON có tên là questions cho ${number} câu hỏi trong lĩnh vực ${field}, trong đó liệt kê một tập hợp các đối tượng con có cấu trúc JSON:
    {
      "question": "câu hỏi",
      "answers": ["câu trả lời 1", "câu trả lời 2", "câu trả lời 3", "câu trả lời 4"],
      "correct": "câu trả lời đúng index (0-3)",
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
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
        // prompt: prompt,
      });
      const parsableJSONresponse = completion.choices[0].message.content;
      const parsedResponse = JSON.parse(parsableJSONresponse);
      return { result: parsedResponse };
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = openaiService;
