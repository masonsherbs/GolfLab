import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FacilityFeatures from "@/components/FacilityFeatures";
import MembershipPlans from "@/components/MembershipPlans";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, BarChart3, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About Premier Golf
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Premier Golf is an exclusive membership indoor simulator
                experience with access to Trackman, the same technology and
                system used by the PGA Tour and some of the top professionals in
                the world. Combining dual radar with high-end optics to track
                and display the full trajectory of any shot, from short putts to
                400-yard drives.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                The facility offers advanced analytics in a private, comfortable
                and professional setting year-round. Whether your goal is to
                improve your game, keep it sharp or gain access to virtual
                courses 24/7; Premier Golf provides an unmatched experience with
                the standards of a country club but the feel of your own home.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">26+</h3>
                <p className="text-gray-600">Data Points Tracked</p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">6-10</h3>
                <p className="text-gray-600">Stroke Improvement Average</p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
                <p className="text-gray-600">Member Access</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <HowItWorks />
      <FacilityFeatures />

      {/* Trackman Technology Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              What does Trackman track?
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              TrackMan gives you access to the most progressive and
              sophisticated performance-enhancing software in the industry. With
              more than 26 data points and multiple camera angles, you are
              provided with the data and feedback to enhance your game.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-3">
                    Ball Flight Data
                  </h3>
                  <p className="text-gray-300">
                    Track ball speed, launch angle, spin rate, carry distance,
                    and total distance with pinpoint accuracy.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-3">
                    Club Data
                  </h3>
                  <p className="text-gray-300">
                    Monitor club speed, attack angle, club path, face angle, and
                    impact location for every swing.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-3">
                    Advanced Analytics
                  </h3>
                  <p className="text-gray-300">
                    Get detailed reports, shot patterns, and improvement
                    recommendations based on your performance data.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-8 mb-6">
                <div className="text-6xl font-bold text-white mb-2">6-10</div>
                <div className="text-green-200 text-lg">Stroke Improvement</div>
                <div className="text-green-300 text-sm">Average per year</div>
              </div>
              <p className="text-gray-300 text-lg">
                The average Trackman user lowers their handicap by 6-10 strokes
                from year to year. You won't just improve, you'll improve faster
                than you thought possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MembershipPlans />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
