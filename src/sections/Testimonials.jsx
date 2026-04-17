import { testimonials } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

const Testimonials = () => {
  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="What People Say About Me?"
          sub="⭐️ Customer feedback highlights"
        />

        <div className="lg:columns-3 md:columns-2 columns-1 mt-16">
          {testimonials.map((testimonial, index) => (
            <GlowCard card={testimonial} key={index} index={index}>
              
              {/* PROFILE SECTION */}
              <div className="flex items-center gap-4 mt-4">

                {/* IMAGE (INCREASED SIZE) */}
                <img
                  src={testimonial.imgPath}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />

                {/* TEXT */}
                <div className="flex flex-col leading-tight">
                  <p className="font-bold text-white text-[15px]">
                    {testimonial.name}
                  </p>

                  {/* DESIGNATION */}
                  <p className="text-white-50 text-[13px]">
                    {testimonial.role || testimonial.designation}
                  </p>

                  {/* COMPANY */}
                  <p className="text-white-50 text-[13px]">
                    {testimonial.company || testimonial.mentions}
                  </p>
                </div>

              </div>

            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;