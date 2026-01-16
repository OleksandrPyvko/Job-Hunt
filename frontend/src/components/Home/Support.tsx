import MailIcon from "../Icons/MailIcon";
import PhoneIcon from "../Icons/PhoneIcon";
import ContactItem from "./ContactItem";

function Support() {
  return (
    <section id="support" className="py-28   md:text-center border-t border-neutral-700">
      <p className="font-semibold">Support</p>
      <h3 className="text-4xl  my-3">Get in touch</h3>
      <p className="mb-6">
        Have questions or need help? We're here to assist you.
      </p>

      <div>
        <div className="md:flex md:justify-center md:gap-20 md:text-left">
          <ContactItem
            icon={<MailIcon />}
            title="Email"
            label="reach us at"
            type="mailto"
            value="support@jobhuntportal.com"
          />

          <ContactItem
            icon={<PhoneIcon />}
            title="Phone"
            label="Call us at"
            type="tel"
            value="+1 (890) 123-4567"
          />
        </div>
      </div>
    </section>
  );
}

export default Support;
