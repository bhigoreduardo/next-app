const Footer = () => {
  return (
    <footer className="sm:flex sm:flex-between sm:gap-16 bg-wh-900 text-wh-50 px-10 py-4">
      {/* FIRST COL */}
      <div className="basis-1/2">
        <h4 className="font-bold">BLOG THE FUTURE</h4>
        <p className="my-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae sed
          vel numquam natus iste fuga, architecto voluptatum aut, quibusdam
          exercitationem adipisci consequuntur expedita pariatur aspernatur.
          Doloribus enim dolores qui unde.
        </p>
        <p>© Blog of the Future All Rights Reserved.</p>
      </div>
      {/* SECOND COL */}
      <div className="basis-1/4">
        <h4 className="font-bold">Links</h4>
        <p className="my-5">Massa orci senectus</p>
        <p className="my-5">Some random link again</p>
      </div>
      {/* THIRD COL */}
      <div className="basis-1/4">
        <h4 className="font-bold">Contact Us</h4>
        <p className="my-5">Tempus metus mattis risus volutpat egestas.</p>
        <p>(333)425-6825</p>
      </div>
    </footer>
  );
};
export default Footer;
