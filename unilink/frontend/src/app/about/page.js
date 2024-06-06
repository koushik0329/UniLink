export default function About() {
    return <>
        <div
            className="
                mx-auto
                px-10
                py-10
                min-w-[400px]
                max-w-[700px]
                flex flex-col space-y-5
                ">
            <p className="text-xl">
                About
            </p>
            <p>
                Welcome
            </p>
            <p>
                I would like to express my sincere gratitude to the individuals whose contributions have played an integral role in the development of this project. Their contributions have made a significant impact on my learning journey, and I am deeply appreciative of the knowledge and inspiration provided by them.
            </p>
            <div>
                <p>
                    What I have learnt about .... 🚧
                </p>
                <ul className="list-disc list-inside">
                    <li>nextjs</li>
                    <li>tailwind css</li>
                    <li>blocknote</li>
                    <li>fooocus</li>
                    <li>firebase</li>
                    <li>chatgpt offline / llama</li>
                </ul>
            </div>
            <div>
                <p>
                    References .... 🚧
                </p>
                <ul className="list-disc list-inside">
                    <li>codevolution</li>
                    <li>stackoverflow</li>
                    <li>other youtube videos</li>
                </ul>
            </div>
        </div>
    </>
}