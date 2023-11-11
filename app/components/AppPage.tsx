import React, { FC, ReactNode } from "react";

type AppPageProps = {
  children: ReactNode;
};
const AppPage: FC<AppPageProps> = (props) => {
  return (
    <div className="mt-[100px] py-5 w-[600px] flex flex-col gap-10">
      {props.children}
    </div>
  );
};

export default AppPage;
