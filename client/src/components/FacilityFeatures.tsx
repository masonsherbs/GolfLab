import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FacilityFeatures = () => {
  const features = [
    {
      title: "Virtual Golf",
      description: "Play famous courses from around the world",
      image: "virtual-golf",
      highlight: "200+ Courses",
    },
    {
      title: "Practice Facility",
      description: "Professional driving range with instant feedback",
      image: "practice-facility",
      highlight: "Real-time Data",
    },
    {
      title: "Games",
      description: "Fun competitive games and challenges",
      image: "games",
      highlight: "Multiplayer",
    },
    {
      title: "Shot Analysis",
      description: "Detailed analytics for every shot",
      image: "shot-analysis",
      highlight: "26+ Data Points",
    },
    {
      title: "Fun For Everyone",
      description: "Perfect for all skill levels and ages",
      image: "fun-for-everyone",
      highlight: "All Ages",
    },
    {
      title: "Compete",
      description: "Tournament mode and leaderboards",
      image: "compete",
      highlight: "Tournaments",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What does this facility offer?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our state-of-the-art facility provides everything you need to
            improve your game, have fun, and experience golf like never before.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative">
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center z-10">
                    <div className="w-16 h-16 mx-auto mb-3 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {feature.title.charAt(0)}
                      </span>
                    </div>
                    <p className="text-green-800 font-semibold text-sm">
                      {feature.image.replace("-", " ").toUpperCase()}
                    </p>
                  </div>

                  {/* Highlight Badge */}
                  <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-500 text-white">
                    {feature.highlight}
                  </Badge>

                  {/* Background Pattern */}
                  <div
                    className={
                      'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0-20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zM0 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z"/%3E%3C/g%3E%3C/svg%3E\')] opacity-30'
                    }
                  ></div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 px-8 py-3"
          >
            See Trackman in action
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FacilityFeatures;
