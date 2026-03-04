import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Card } from "@/components/ui/card";
import { CheckCircle, Users, Globe, Award } from "lucide-react";

export const metadata = {
  title: "About WholeGrains - B2B Wholesale",
  description: "Learn about our mission to provide quality wholesale groceries to businesses",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-12 md:py-16 bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About WholeGrains
            </h1>
            <p className="text-lg text-foreground/60">
              Transforming wholesale grocery distribution for businesses
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-foreground/70 mb-4">
                  We believe that quality wholesale groceries should be accessible to all businesses. Our mission is to connect farmers and producers directly with restaurants, hotels, food services, and retail businesses.
                </p>
                <p className="text-lg text-foreground/70">
                  By cutting out middlemen and reducing logistics costs, we pass the savings directly to our customers while ensuring the freshest products reach their doors.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "500+", label: "Products" },
                  { number: "100+", label: "Partners" },
                  { number: "15+", label: "Regions" },
                  { number: "99%", label: "On-Time" },
                ].map((stat, i) => (
                  <Card key={i} className="p-6 text-center bg-primary/5 border-primary/20">
                    <p className="text-3xl font-bold text-primary mb-1">
                      {stat.number}
                    </p>
                    <p className="text-sm text-foreground/60">{stat.label}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Our Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Award,
                  title: "Quality First",
                  description: "We never compromise on the quality of our products",
                },
                {
                  icon: CheckCircle,
                  title: "Reliability",
                  description: "On-time delivery and consistent service every time",
                },
                {
                  icon: Users,
                  title: "Partnership",
                  description: "We grow when our customers succeed",
                },
                {
                  icon: Globe,
                  title: "Sustainability",
                  description: "Supporting local farmers and eco-friendly practices",
                },
              ].map((value, i) => (
                <Card key={i} className="p-6">
                  <value.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-foreground/60">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Why Choose Us?
            </h2>

            <div className="space-y-4 max-w-3xl mx-auto">
              {[
                "Direct sourcing from verified farmers and producers",
                "Competitive wholesale pricing with volume discounts",
                "Fast and reliable delivery to your location",
                "Quality assurance and product certifications",
                "Dedicated account managers for bulk orders",
                "Flexible payment terms for registered businesses",
              ].map((reason, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground/80">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
