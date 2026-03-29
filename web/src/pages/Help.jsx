import PageTransition from "../components/layout/PageTransition";

function Section({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{children}</div>
    </section>
  );
}

export default function Help() {
  return (
    <PageTransition>
      <div className="mx-auto w-full max-w-3xl space-y-10 px-1">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Help &amp; Support</h1>

        <Section title="1. Getting Started">
          <p>
            <strong className="text-gray-900 dark:text-gray-100">How to create an account:</strong> Use{" "}
            <em>Register</em> from the landing page or app header, pick a username and email, then sign in with{" "}
            <em>Log in</em>.
          </p>
          <p>
            <strong className="text-gray-900 dark:text-gray-100">How to create a post:</strong> Open{" "}
            <em>Create Post</em> from the sidebar or the feed prompt, choose a community and post type, add a title and
            body, then tap <em>Post</em>.
          </p>
        </Section>

        <Section title="2. Communities">
          <p>
            <strong className="text-gray-900 dark:text-gray-100">How to join communities:</strong> Browse Home,
            Popular, or Search to find threads; follow links to communities and engage by voting and commenting.
          </p>
          <p>
            <strong className="text-gray-900 dark:text-gray-100">How to create your own:</strong> Choose{" "}
            <em>Start a community</em> in the sidebar and complete the steps in the modal (topics, type, name, and
            description).
          </p>
        </Section>

        <Section title="3. Posting &amp; Interaction">
          <p>
            <strong className="text-gray-900 dark:text-gray-100">Voting system:</strong> Use upvote and downvote on
            posts and comments to surface what the community finds helpful.
          </p>
          <p>
            <strong className="text-gray-900 dark:text-gray-100">Commenting:</strong> Open a post, write your reply in
            the comment box, and submit to join the thread.
          </p>
        </Section>

        <Section title="4. Account &amp; Settings">
          <p>
            <strong className="text-gray-900 dark:text-gray-100">Profile management:</strong> Open your avatar menu and
            select <em>Profile</em> to view your activity and edit your bio when signed in.
          </p>
          <p>
            <strong className="text-gray-900 dark:text-gray-100">Theme toggle:</strong> Use the sun/moon switch in the
            top bar to switch between light and dark mode. Your choice is saved on this device.
          </p>
        </Section>
      </div>
    </PageTransition>
  );
}
