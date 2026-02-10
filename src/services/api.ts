
interface WorkHistoryItem {
    Company: {
        type: String
    },
    StartPeriod: {
        type: String
    },
    EndPeriod: {
        type: String
    },
    Number: {
        type: Number
    }
};

export  interface description {
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String
    },
    profile:{
        Name:{
            type:String
        },
        Location:{
            type:String
        },
        Phonenumber:{
            type:String
        },
        Gmail:{
            type:String
        },
        Linkdin:{
            type:String
        },
        Degree:{
            type:String
        },
        University:{
            type:String
        },
        StartPeriod:{
            type:String
        },
        EndPeriod:{
            type:String
        },
        WorkHistory:[WorkHistoryItem]
    }
}


const resume = async (JobTitle: string, JobDescription: string, user: description) => {
  let WorkHistory = user.profile.WorkHistory;

  let workHistoryString = WorkHistory.map((item) => {
    return `Company:${item.Company},Start Period:${item.StartPeriod},End Period:${item.EndPeriod}`;
  }).join("\n");

  try {
    let res = await fetch("https://openrouter.ai/api/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-nano-9b-v2:free",
        input: [
          {
            type: "message",
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Hello, I want you the best resume for me.
                Make the font-family as "Arial".
                "${JobTitle}" This is the job that I wanna apply.
                ${JobDescription} This is the description of the skills for job that you have to consider when you write my resume. 
                I will give the order for writing my resume.
                ${user.profile.Name} This is my name to make larger than other letters and bold to be remarkable.
                ${user.profile.Location},${user.profile.Phonenumber},${user.profile.Gmail},${user.profile.Linkdin} These are should be in one line under the name, it's ok if is small.
                And Make the summary of me to be appropriate to the description as senior one in seven lines in one paragraph.
                Next, pick up the all the possible skills and keywords from the description and add some additional skills that is related to this job.
                I will give you my work history so that you write my work history. You have to write each part such as this order: Title which stands out, Company, Period, and experience.
                Experience should be at least 15 lines, five lists and each lists starts in new line in each.
                Experience part is longer, the better but each experience should be listed with dash,new line and <li> tag.
                ${workHistoryString}
                Finally, this is Education part. Write this to recognize easily.
                ${user.profile.Degree},${user.profile.University},${user.profile.StartPeriod}~${user.profile.EndPeriod}
                Resume is essential for application the job. I believe you. Please make the resume that is for senior without any excuse.
                Just generate.
                What I am going to say is resume should be listed in each item and the titles should be bold.
                And please give me the only completed html content in <body> tag that I can download it to word immediately.
                Make sure that has modified in html code.
                Just give me resume content without any speaking.
                Thank you friend. You are always helping me.
                `,
              }
            ]
          }
        ]
      }),
    });

    const resData = await res.json();
    console.log(resData)

    if (resData.output && Array.isArray(resData.output) && resData.output.length > 0) {
      let lastIndex = resData.output.length - 1;
      console.log(resData.output[lastIndex].content[0].text);
      return resData.output[lastIndex].content[0].text;
    } else {
      console.error("Unexpected response structure:", resData);
      throw new Error("Output is not defined or is empty");
    }
  } catch (error) {
    console.error("Error fetching data from OpenRouter:", error);
    throw error;
  }
};

export default resume;

