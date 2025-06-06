import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Clock, Play } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      step: "1",
      title: "Sign Up & Orientation",
      description:
        "After signing up, new members receive a 60 minute orientation and training on membership rules, facility access, and Trackman usage.",
    },
    {
      icon: Clock,
      step: "2",
      title: "Book Your Time",
      description:
        "Once orientation is complete, members can book time. The facility is accessible 24/7 for your convenience.",
    },
    {
      icon: Play,
      step: "3",
      title: "Play & Practice",
      description:
        "Show up to our private facility during your scheduled time, let yourself in with your door badge and play/practice. When done, let yourself out.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with Premier Golf is simple. Follow these three easy
            steps to begin your journey to better golf.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="relative group hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-8 text-center">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="w-8 h-8 rounded-full bg-green-600 hover:bg-green-600 text-white flex items-center justify-center text-lg font-bold">
                      {step.step}
                    </Badge>
                  </div>

                  {/* Icon */}
                  <div className="mt-4 mb-6">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <Icon className="w-8 h-8 text-green-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-green-600 font-semibold">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <span>
              Private, comfortable, and professional setting year-round
            </span>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
