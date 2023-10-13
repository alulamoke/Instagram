import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Components
import { Button } from "./ui/button";

// Svgs
import EmptyImg from "@/assets/empty.svg";

type TNoContentProps = {
  title?: string;
  subtitle?: string;
};

export const NoContent: React.FC<TNoContentProps> = ({
  title = "",
  subtitle = "",
}) => {
  return (
    <>
      <Helmet>
        <title>
          {title} {subtitle}
        </title>
      </Helmet>
      <div
        style={{ minHeight: "calc(100vh - 8rem)" }}
        className="flex h-full w-full flex-col items-center justify-center gap-y-12 lg:px-8 xl:px-12"
      >
        <div className="flex flex-col items-center gap-y-4 text-center">
          <h1 className="text-3xl font-light">{title}</h1>
          <p className="text-xl italic">{subtitle}</p>
        </div>
        <img
          src={EmptyImg}
          alt="Not Content"
          className="h-[25vh] max-w-full dark:hue-rotate-15 dark:saturate-200 dark:filter md:h-[40vh]"
        />
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </div>
    </>
  );
};
