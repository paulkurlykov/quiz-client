import { ReactNode } from "react";

function TagMain({ children }: {children: ReactNode}) {
  return (
    <main className="flex max-w-[100rem] w-full mx-auto overflow-hidden items-center justify-center grow">
      <div className="flex flex-col mb-24 border-4 border-gray-950 w-full h-full">{children}</div>
    </main>
  );
}

export default TagMain;
