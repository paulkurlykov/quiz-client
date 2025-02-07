import { ReactNode } from "react";

function TagMain({ children }: {children: ReactNode}) {
  return (
    <main className="flex relative max-w-[100rem] w-full mx-auto z-50 overflow-hidden items-center justify-center grow">
      <div className="flex flex-col border-4 border-gray-950 w-full h-full">{children}</div>
    </main>
  );
}

export default TagMain;
