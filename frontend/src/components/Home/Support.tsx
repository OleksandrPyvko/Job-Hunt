import MailIcon from "../Icons/MailIcon";
import PhoneIcon from "../Icons/PhoneIcon";
import ContactItem from "./ContactItem";

function Support() {
  return (
    <div className="py-10">
      <p className="font-semibold">Support</p>
      <h3 className="text-4xl  my-3">Get in touch</h3>
      <p className="mb-6">Have questions or need help? We're here to assist you.</p>

      <div>
        <div>
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
        <div>map?</div>
      </div>
    </div>
  );
}

export default Support;
