
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, MessageCircle, Calendar } from "lucide-react";

const CommunityTeaser = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Join Our Community | Sanghos</title>
        <meta
          name="description"
          content="Join the Sanghos community to connect with like-minded individuals, share experiences, and deepen your wellness journey."
        />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          {/* Hero Section */}
          <section className="py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Vibrant Community</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connect with like-minded individuals, share your wellness journey, and access exclusive content and events.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" onClick={() => navigate("/join")} className="flex items-center">
                  Join Sanghos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 bg-muted/30 rounded-2xl my-12">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold text-center mb-12">Community Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Connect</h3>
                  <p className="text-muted-foreground">
                    Connect with fellow wellness enthusiasts who share your interests and passions.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Share</h3>
                  <p className="text-muted-foreground">
                    Share your experiences, insights, and questions in our supportive forums.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Events</h3>
                  <p className="text-muted-foreground">
                    Access exclusive community events and connect with our instructors.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">What Our Community Members Say</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                  <p className="italic mb-4">
                    "Joining the Sanghos community has been transformative for my wellness journey. I've found so many like-minded individuals who support and inspire me."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/20 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Sarah J.</p>
                      <p className="text-sm text-muted-foreground">Member since 2023</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                  <p className="italic mb-4">
                    "The community forums have been an incredible resource. I've learned so much from other members and found practices that work for me."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/20 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Michael T.</p>
                      <p className="text-sm text-muted-foreground">Member since 2022</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-primary/10 rounded-2xl my-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Create your Sanghos account today and start connecting with our community of wellness enthusiasts.
            </p>
            <Button size="lg" onClick={() => navigate("/join")} className="flex items-center mx-auto">
              Join Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CommunityTeaser;
