import style from "@/styles/Privacy.module.css";

const PrivacyPolicy = () => {
  return (
    <main className={style.privacy}>
      <div>
        <h1>Qanst Privacy Policy</h1>
        <p className={style.date}>Last updated: 2023-10-14</p>
        <p>
          Welcome to Qanst, a collaborative Q&A platform that empowers
          curiosity, connects minds, and facilitates meaningful conversations.
          This Privacy Policy outlines our practices regarding the collection,
          use, and disclosure of information when you use our platform.
        </p>
      </div>

      <div>
        <h2>Information We Collect</h2>
        <h3>Personal Information</h3>
        When you use Qanst, we may collect certain personally identifiable
        information, including but not limited to:
        <p>
          <strong>Name</strong>: We collect your name to personalize your
          experience.
        </p>
        <p>
          <strong>Email Address</strong>: Your email address is collected for
          authentication purposes.
        </p>
        <p>
          <strong>Profile Picture:</strong> We collect your profile picture to
          personalize user experience.
        </p>
      </div>

      <div>
        <h2>Use of Information</h2>
        We use the collected information for various purposes, including:
        <p>
          <strong>Form Creation:</strong> To enable users to easily create and
          customize forms.
        </p>
        <p>
          <strong>Collaborative Inquiry:</strong> Facilitating engaging
          discussions and exploring diverse perspectives.
        </p>
      </div>

      <div>
        <h2>Information Sharing</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personally
          identifiable information to outside parties. This does not include
          trusted third parties who assist us in operating our platform,
          conducting our business, or servicing you, as long as those parties
          agree to keep this information confidential.
        </p>
      </div>

      <div>
        <h2>Security</h2>
        <p>
          We prioritize the security of your personal information. We implement
          a variety of security measures to maintain the safety of your personal
          information.
        </p>
      </div>

      <div>
        <h2>Your Consent</h2>
        <p>By using Qanst, you consent to our Privacy Policy.</p>
      </div>

      <div>
        <h2>Changes to Privacy Policy</h2>
        <p>
          Any changes to our Privacy Policy will be posted on this page. It is
          your responsibility to review this Privacy Policy periodically.
        </p>
      </div>

      <div>
        <h2>Contact Information</h2>
        <p>
          If you have any questions or concerns regarding our Privacy Policy,
          please contact us at{" "}
          <a href="https://www.linkedin.com/in/akash-singh8/">LinkedIn</a>.
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
