import Spinner from "../components/Spinner";
import CodeSnippet from "@/components/CodeSnippet";
import MotionPage from "@/components/MotionPage";
import Title from "@/components/Title";

function AboutPage() {

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

