import userData from "./data.json"

userData["description"] = [
  <>
    I'm a 2nd year{" "}
    <a
      href="https://www.ri.cmu.edu/education/academic-programs/master-of-science-robotics/"
      target="_blank"
      className="text-gray-800 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
    >
      MSR
    </a>{" "}
    at Carnegie Mellon University advised by Prof.{" "}
    <a
      href="https://www.laszlojeni.com/"
      target="_blank"
      className="text-gray-800 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
    >
      László Jeni
    </a>{" "}
    working on 3D/4D reconstruction and multimodal benchmarking.
  </>,
  <>
    Previously, I was a Research Scientist/Engineer Intern at Adobe Research
    mentored by{" "}
    <a
      href="https://krishnamullia.com"
      target="_blank"
      className="text-gray-800 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
    >
      Krishna Mullia
    </a>
    , where I worked on high-resolution and HDR Gaussian Splatting.
  </>,
  <>
    Before that, I was an AI Resident at Meta in FAIR advised by Dr.{" "}
    <a
      href="https://satwikkottur.github.io/"
      target="_blank"
      className="text-gray-800 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
    >
      Satwik Kottur
    </a>
    . There I worked on egocentric video-language modeling and long egocentric
    video understanding.
  </>,
  <>
    I completed my undergrad at UMass Amherst in Computer Science and
    Statistics. There, I worked on the{" "}
    <a
      href="https://www.amazon.science/alexa-prize/taskbot-challenge"
      target="_blank"
      className="text-gray-800 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
    >
      Alexa Prize Taskbot Challenge
    </a>{" "}
    under the supervision of Prof.{" "}
    <a
      href="https://groups.cs.umass.edu/zamani/"
      target="_blank"
      className="text-gray-800 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
    >
      Hamed Zamani
    </a>{" "}
    on In-Task question answering. Also, I was advised by Prof.{" "}
    <a
      href="https://people.cs.umass.edu/~miyyer/"
      target="_blank"
      className="text-gray-800 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
    >
      Mohit Iyyer
    </a>{" "}
    and Prof.{" "}
    <a
      href="https://people.cs.umass.edu/~mfiterau/"
      target="_blank"
      className="text-gray-800 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
    >
      Ina Fiterau
    </a>{" "}
    on my Honor Thesis examining vision-language pretrained models. During the
    Summer of 2021, I was fortunate enough to attend{" "}
    <a
      href="https://www.cs.umd.edu/projects/reucaar"
      target="_blank"
      className="text-gray-800 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
    >
      REU CAAR
    </a>{" "}
    working under Prof.{" "}
    <a
      href="https://jpdickerson.com/"
      target="_blank"
      className="text-gray-800 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
    >
      John Dickerson
    </a>{" "}
    and Prof.{" "}
    <a
      href="https://www.cs.umd.edu/~tomg/"
      target="_blank"
      className="text-gray-800 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
    >
      Tom Goldstein
    </a>{" "}
    on facial detection/recognition bias and robustness.
  </>,
]

userData["encodedEmail"] = userData["email"]
  .replace("@", " [at] ")
  .replace(/\./g, " [dot] ")

export default userData
