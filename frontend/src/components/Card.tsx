import { PropsWithChildren } from "react";

interface CardProps
  extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  className?: string;
}

const BaseCard = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className="flex flex-col space-y-0.5 py-7 px-12 border rounded-lg bg-gradient-to-br from-gray-950 to-black border-gray-800"
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps
  extends PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  className?: string;
}

const CardTitle = ({ className, children, ...props }: CardTitleProps) => {
  return (
    <h1 className="text-4xl font-medium mb-6" {...props}>
      {children}
    </h1>
  );
};

interface CardBodyProps
  extends PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>> {
  className?: string;
}

const CardBody = ({ className, children, ...props }: CardBodyProps) => {
  return (
    <div className="text-xs text-gray-400 pl-0.5" {...props}>
      {children}
    </div>
  );
};

export let Card = Object.assign(BaseCard, {
  Title: CardTitle,
  Body: CardBody,
});
