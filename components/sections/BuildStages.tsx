import Container from "@/components/ui/Container";
import AnimateOnView from "@/components/ui/AnimateOnView";

interface Stage {
  num: string;    // "01", "02", ...
  title: string;
  desc: string;
}

interface BuildStagesProps {
  heading: string;
  stages: Stage[];
}

export default function BuildStages({ heading, stages }: BuildStagesProps) {
  return (
    <section className="py-20 md:py-28 bg-dark">
      <Container>
        <AnimateOnView className="text-center mb-14">
          <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
            Этапы работ
          </p>
          <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {heading}
          </h2>
        </AnimateOnView>

        <div className="space-y-4">
          {stages.map((stage, i) => (
            <AnimateOnView key={stage.num} delay={i * 0.07}>
              <div className="group flex gap-4 sm:gap-6 items-start p-6 sm:p-8 bg-white/5 rounded-lg border border-white/10 hover:border-accent/30 transition-colors">
                <span className="font-oswald text-3xl sm:text-5xl font-bold text-accent leading-none shrink-0 w-10 sm:w-16 text-center">
                  {stage.num}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-oswald text-xl sm:text-2xl font-semibold text-white mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </Container>
    </section>
  );
}
