import PageTransition from "../components/layout/PageTransition";

const LIST = [
  "Create posts",
  "Join communities",
  "Upvote/downvote",
  "Comment and interact",
];

export default function About() {
  return (
    <PageTransition>
      <article className="mx-auto w-full max-w-3xl space-y-8 px-1">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">About Threadit</h1>
        </header>

        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Threadit is a community-driven platform inspired by Reddit, where users can discover, share, and discuss
            content across a wide range of topics. From technology and entertainment to personal stories and niche
            interests, Threadit brings people together through conversations.
          </p>
          <p>
            Users can create posts, join communities, vote on content, and engage in meaningful discussions. The
            platform is designed to prioritize authenticity, user interaction, and content discovery.
          </p>
          <p>
            Threadit follows the core idea of Reddit — empowering communities to grow organically while giving users
            control over what they see and engage with.
          </p>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">What you can do</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
            {LIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </article>
    </PageTransition>
  );
}
