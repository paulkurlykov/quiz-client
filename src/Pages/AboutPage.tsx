import CodeSnippet from "@/components/CodeSnippet";
import MotionPage from "@/components/MotionPage";
import Title from "@/components/Title";

function AboutPage() {


  const arr = Array(5).fill("1");
  const arr2 = Array.from({length: 12}, (_, i) => `index #${i}`);

  class Next {
    #radeon = 'Radeonich';
    static potatoes = 'Belarus'

    get radeon () {
      return this.#radeon;
    }
  }

  class Forward extends Next {
    #freesbue = 'Guga-Gacha'
    static forwa = 'Forawrd'

  }

  const next = new Next();
  const forward = new Forward();

  // console.log(Next.#radeon)
  console.log(next.radeon);

  
  const erorr = new Error('this is for ERROR test')

    const codeString = `const map = new Map();

    map.set("1", "str1");    // строка в качестве ключа
    map.set(1, "num1");      // цифра как ключ
    map.set(true, "bool1");  // булево значение как ключ`;

  return (
    <MotionPage>
        <Title className="mb-24" tag="h1" >Просто тест компонента</Title>
      <CodeSnippet>{codeString}</CodeSnippet>
    </MotionPage>
  );
}

export default AboutPage;

