import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, BarChart3, Users, Clock, Award, Shield } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Target,
      title: "Precision Technology",
      description:
        "Trackman's dual radar and high-end optics provide unmatched accuracy in tracking every aspect of your golf game.",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description:
        "Members enjoy round-the-clock access to our facility, allowing you to practice and play on your schedule.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Comprehensive data analysis with 26+ data points to help you understand and improve your performance.",
    },
    {
      icon: Users,
      title: "Exclusive Membership",
      description:
        "Join an elite community of golf enthusiasts in a private, professional environment.",
    },
    {
      icon: Award,
      title: "Professional Grade",
      description:
        "The same technology used by PGA Tour professionals and top golf instructors worldwide.",
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description:
        "Enjoy your golf experience in a comfortable, private setting with secure facility access.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-800 to-green-900 text-white overflow-hidden">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-40'
          }
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-orange-500 hover:bg-orange-500 text-white px-4 py-2 text-sm">
            POWERED BY TRACKMAN
          </Badge>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            About Premier Golf
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Experience golf like never before with our exclusive indoor
            simulator facility featuring the same professional-grade technology
            used by PGA Tour players.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The Premier Golf Experience
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Premier Golf is an exclusive membership indoor simulator
                  experience with access to Trackman, the same technology and
                  system used by the PGA Tour and some of the top professionals
                  in the world. Combining dual radar with high-end optics to
                  track and display the full trajectory of any shot, from short
                  putts to 400-yard drives.
                </p>
                <p>
                  The facility offers advanced analytics in a private,
                  comfortable and professional setting year-round. Whether your
                  goal is to improve your game, keep it sharp or gain access to
                  virtual courses 24/7; Premier Golf provides an unmatched
                  experience with the standards of a country club but the feel
                  of your own home.
                </p>
                <p>
                  Our state-of-the-art facility combines cutting-edge technology
                  with luxury amenities to create the perfect environment for
                  golf enthusiasts of all skill levels. From beginners looking
                  to learn the fundamentals to seasoned players working to
                  refine their technique, Premier Golf offers the tools and
                  environment needed to achieve your goals.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-green-200 rounded-lg overflow-hidden shadow-xl">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
                      <Target className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-green-800 text-lg font-semibold">
                      Professional Simulator
                    </p>
                    <p className="text-green-600">Trackman Technology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Why Choose Premier Golf?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <Icon className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-green-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              By the Numbers
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  26+
                </div>
                <div className="text-gray-600">Data Points Tracked</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  200+
                </div>
                <div className="text-gray-600">Virtual Golf Courses</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  6-10
                </div>
                <div className="text-gray-600">Average Stroke Improvement</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  24/7
                </div>
                <div className="text-gray-600">Member Access Hours</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
