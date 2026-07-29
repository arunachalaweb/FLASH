import { User, FileText, CheckCircle, HardHat, Hammer, FileEdit, Search, Zap, IndianRupee, Landmark } from "lucide-react";

const journeySteps = [
  {
    id: 1,
    title: "Consumer Registration",
    desc: "Sign up to start your application journey",
    role: "Consumer",
    icon: User,
    color: "bg-blue-500 text-white",
  },
  {
    id: 2,
    title: "Application Submission",
    desc: "Submit your Application",
    role: "Consumer",
    icon: FileText,
    color: "bg-blue-500 text-white",
  },
  {
    id: 3,
    title: "Feasibility Approval",
    desc: "Check if your location is solar-ready",
    role: "DISCOM",
    icon: Zap,
    color: "bg-orange-500 text-white",
  },
  {
    id: 4,
    title: "Vendor Selection",
    desc: "Choose the best vendor for installation",
    role: "Consumer",
    icon: Search,
    color: "bg-blue-500 text-white",
  },
  {
    id: 5,
    title: "Work Start",
    desc: "Begin the installation process",
    role: "Vendor",
    icon: Hammer,
    color: "bg-teal-500 text-white",
  },
  {
    id: 6,
    title: "Solar Installation Details",
    desc: "Provide details for your Solar Rooftop Installation",
    role: "Vendor",
    icon: FileEdit,
    color: "bg-teal-500 text-white",
  },
  {
    id: 7,
    title: "Project Inspection",
    desc: "DISCOM to inspect site for compliance",
    role: "DISCOM",
    icon: Search,
    color: "bg-orange-500 text-white",
  },
  {
    id: 8,
    title: "Project Commissioning",
    desc: "DISCOM to certify your Solar Rooftop Installation",
    role: "DISCOM",
    icon: CheckCircle,
    color: "bg-orange-500 text-white",
  },
  {
    id: 9,
    title: "Subsidy Request",
    desc: "Redeem your Subsidy",
    role: "Consumer",
    icon: IndianRupee,
    color: "bg-blue-500 text-white",
  },
  {
    id: 10,
    title: "Subsidy Disbursal",
    desc: "Subsidy Approval",
    role: "REC",
    icon: Landmark,
    color: "bg-purple-500 text-white",
  },
];

export function ConsumerJourney() {
  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-navy-deep">
          Consumer Application Journey
        </h3>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          A complete step-by-step transparent process from your first registration to the final subsidy disbursal.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 border border-blue-100">
          <User className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold text-blue-700">Consumer</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 border border-teal-100">
          <HardHat className="h-4 w-4 text-teal-500" />
          <span className="text-sm font-semibold text-teal-700">Vendor</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 border border-orange-100">
          <Zap className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-semibold text-orange-700">DISCOM</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 border border-purple-100">
          <Landmark className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-semibold text-purple-700">REC</span>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto pb-12">
        {/* Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-border/60 -translate-x-1/2" />

        <div className="space-y-8">
          {journeySteps.map((step, index) => {
            const isEven = index % 2 === 0;
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="relative flex items-center md:justify-between w-full">
                {/* Desktop Left Card */}
                <div className={`hidden md:block w-[45%] ${isEven ? 'text-right pr-10' : 'invisible'}`}>
                  {isEven && (
                    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition group">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Step {step.id}</p>
                      <h4 className="text-lg font-display font-bold text-brand-navy-deep">{step.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  )}
                </div>

                {/* Center Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-background shadow-sm z-10 bg-white">
                  <div className={`flex items-center justify-center w-full h-full rounded-full ${step.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Desktop Right Card & Mobile Card */}
                <div className={`pl-20 md:pl-0 md:w-[45%] ${isEven ? 'md:invisible' : 'md:text-left md:pl-10'}`}>
                  <div className={`bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition group ${isEven ? 'md:hidden' : ''}`}>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Step {step.id}</p>
                    <h4 className="text-lg font-display font-bold text-brand-navy-deep">{step.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
