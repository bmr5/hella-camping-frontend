import Link from "next/link";

type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

type Props = {
  title: string;
  Icon: HeroIcon;
};

function HeaderItem({ title, Icon }: Props) {
  return (
    <Link href={title}>
      <div className="group flex w-12 cursor-pointer flex-col items-end  sm:w-20 text-white">
        <Icon className="mb-1 h-8 group-hover:animate-bounce" />
        <p className="tracking-widest opacity-0 group-hover:opacity-100">
          {title}
        </p>
      </div>
    </Link>
  );
}

export default HeaderItem;
