function Questions() {
  return (
    <section id="FAQ" className=" py-16 max-w-[770px] flex flex-col mx-auto">
      <h2 className="text-4xl font-bold text-center">Questions</h2>
      <p className="text-center mb-10 mt-4">
        Everything you need to know about using Job Seekers Portal.
      </p>

      <h4 className="font-black mb-2">How do I track applications?</h4>
      <p className="mb-10">
        Log in to your dashboard and add each application manually or import
        them from your email. The system stores company name, position,
        location, date applied, and current status. Update your progress
        anytime.
      </p>

      <h4 className="font-black mb-2">Can I schedule interviews here?</h4>
      <p className="mb-10">
        Yes. Navigate to the interviews section to schedule upcoming interviews,
        set reminders, and access prep materials. You can organize by date and
        company.
      </p>

      <h4 className="font-black mb-2">What analytics does it provide?</h4>
      <p className="mb-10">
        The analytics page shows your application rate, response rate, and
        success metrics. See which strategies work best and adjust your approach
        accordingly.
      </p>

      <h4 className="font-black mb-2">Can I edit or delete applications?</h4>
      <p className="mb-10">
        Absolutely. In the applications section, each entry has edit and delete
        buttons. Update details or remove entries as needed.
      </p>
    </section>
  );
}

export default Questions;
