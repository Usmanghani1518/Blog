import React from "react";
import "../Style/About.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";
function WriteForUsPage() {
    return (
        <div className=" about max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Write for Us</h1>
            <p className="text-gray-600 mb-8">
                <strong>Thank you for showing interest</strong> in writing a guest post for Creately. We are glad you are here.
                <strong>Writing for us</strong> is a great way to <strong>show your expertise</strong> and <strong>establish yourself</strong> as an expert in the field. Additionally, you get exposure via our <strong>social media channels</strong> and our goodwill 🙂.
                Please take some time to review this entire page as it <strong>clearly explains the guidelines</strong>, the submission process, and the type of content we accept.
            </p>

            <h2 className="text-2xl font-bold mb-4">What We Look For</h2>
            <ul className="list-disc pl-6 mb-8">
                <li><strong>Relevant</strong>, <strong>well-researched posts</strong> (preferably <strong>1000+ words</strong>) with <strong>actionable tips</strong>.</li>
                <li><strong>Original</strong> and <strong>unpublished content</strong>.</li>
                <li><strong>Claims backed</strong> by links to <strong>credible research</strong> or case studies. Avoid citing our competitors, and using any irrelevant promotional links to websites.</li>
                <li><strong>Examples</strong> and <strong>relevant images</strong> to illustrate your point. Avoid using stock photos that don’t add any value to the copy. Use Creately to <strong>visualize data, information, processes, ideas, and frameworks</strong>.</li>
                <li>Includes <strong>subheadings</strong>, <strong>bullet points</strong>, and <strong>shorter paragraphs</strong> which make the article more readable.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Topics We Cover</h2>
            <ul className="list-disc pl-6 mb-8">
                <li>Web Development</li>
                <li>App Developmen</li>
                <li>Cloud Computing</li>
                <li>Coding</li>
                <li>JavaScript</li>
                <li>NodeJS</li>
                <li>AI</li>
                <li>Technology</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">The Benefits</h2>
            <p className="text-gray-600 mb-8">
                <strong>Exposure to a massive audience:</strong> The blog gets <strong>100,000+ visitors per month</strong> and is increasing steadily. All <strong>high-quality articles</strong> are included in our monthly newsletter as well, hence bringing your piece in front of a wider audience who will read and reshare your content.
            </p>
            <p className="text-gray-600 mb-8">
                <strong>Social Media Exposure:</strong> We maintain an active presence on <strong>social networks like Facebook, Twitter, LinkedIn, and Pinterest</strong>. All your articles will be shared via these networks for additional exposure.
            </p>

            <h2 className="text-2xl font-bold mb-4">Submission Guidelines</h2>
            <ul className="list-disc pl-6 mb-8">
                <li>Your article must be <strong>1000+ words</strong> and offer something valuable to our readers.</li>
                <li>You can only have <strong>1 self-serving link</strong>. Either a link to a relevant, informative, resource (i.e. a blog post) in the body of the article (dofollow link) or to your site or to any social media channel in the author bio (dofollow link). You can link to other relevant articles from the Creately blog that may add value to the article. But please refrain from excessive linking. In general, it’s best to keep the link count under 5.</li>
                <li>Outgoing links must be <strong>relevant to our blog</strong>. For example, linking to dating sites, SEO agencies, Credit-related sites, etc. aren’t allowed.</li>
                <li>Once published on our blog you cannot publish it anywhere else, including your own blog.</li>
                <li><strong>Images and videos</strong> are encouraged, as they make the article look further enticing to the reader. <strong>Images width should be 580 pixels or less</strong>. Please send them as a separate attachment. Make sure not to violate copyright when using images. Give credit when needed. If you’re including technical diagrams like flowcharts, Gantt charts use the ones found in our diagram community.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Consider These When You Write for Us</h2>
            <p className="text-gray-600 mb-8">
                We decided to open up for guest posting to give our readers and entrepreneurs a chance to build their brand. So we like to work with <strong>real people</strong> and not with <strong>SEO agencies</strong>. Please get to know us a bit better before sending us your article. <strong>Follow us</strong> on our social media channels and share our other articles. This will greatly increase your chances of getting published.
            </p>
            <section>
        {/* <h2 className="text-3xl font-semibold mb-4 mt-2">Follow Us On:</h2> */}
        <div className="flex mb-2 space-x-4">
          <Link to="https://www.facebook.com/profile.php?id=100076522775933">
            <FontAwesomeIcon className='text-blue-600' icon={faFacebook} size="2x" />
          </Link>
          <Link to="https://www.instagram.com/mrusmanghani8/">
            <FontAwesomeIcon className='text-pink-700' icon={faInstagram} size="2x" />
          </Link>
          <Link to="https://www.linkedin.com/in/usman-ghani-11a460240/">
            <FontAwesomeIcon className='text-blue-600' icon={faLinkedin} size="2x" />
          </Link>
          <Link to="https://github.com/Usmanghani1518">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </Link>
        </div>
      </section>
            <p className="text-gray-600 mb-8">
                We get <strong>50-100 submissions per month</strong>. Therefore avoid sending emails asking whether your article is getting published or not. If we have selected your article, you’ll hear from us.
            </p>
            <p className="text-gray-600 mb-8">
                The page is a bit long and the requirements a bit stiff, but we feel it’s necessary to reduce spam submissions. <strong>Looking forward to some great articles.</strong> If we think it’s the right fit, we’ll be in touch to discuss the next steps and anything else we need to publish your post.
            </p>
        </div>
    );
}

export default WriteForUsPage;