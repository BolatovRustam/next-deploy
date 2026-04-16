import { FC } from "react";

interface IProps {
    children: React.ReactNode
}

const AboutLayout: FC<IProps> = ({ children }) => {
    return <section className="mx-auto max-w-5xl">{children}</section>
}

export default AboutLayout

