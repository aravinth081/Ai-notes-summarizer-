"use client";

import { motion } from "framer-motion";
import { Check, X, Sparkles, Zap, Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRICING_PLANS } from "@/lib/constants";

const iconMap = [Sparkles, Zap, Building2];

/**
 * Pricing section with 3-tier cards
 * The middle "Pro" card is highlighted as popular
 */
export function PricingCards() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-violet-400 uppercase bg-violet-500/10 rounded-full border border-violet-500/20 mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Simple, Transparent{" "}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, index) => {
            const Icon = iconMap[index];
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                  isPopular
                    ? "border-violet-500/50 bg-gradient-to-b from-violet-500/10 to-transparent shadow-xl shadow-violet-500/5 scale-[1.02] lg:scale-105"
                    : "border-border/50 bg-card/50 hover:border-border hover:shadow-lg"
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="gradient" className="px-4 py-1 shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Plan Icon */}
                <div
                  className={`inline-flex self-start p-2.5 rounded-xl mb-4 ${
                    isPopular
                      ? "bg-gradient-to-br from-violet-500 to-indigo-500"
                      : "bg-muted"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isPopular ? "text-white" : "text-foreground"
                    }`}
                  />
                </div>

                {/* Plan Name & Description */}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">
                      {plan.price === 0 ? "Free" : `$${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground text-sm">/month</span>
                    )}
                  </div>
                  {plan.priceInr && (
                    <p className="text-xs text-muted-foreground mt-1">
                      ≈ ₹{plan.priceInr}/month
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <Link href="/register" className="mb-8">
                  <Button
                    variant={isPopular ? "gradient" : "outline"}
                    className="w-full"
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>

                {/* Features */}
                <div className="space-y-3 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    What&apos;s included
                  </p>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                        <Check className="h-3 w-3 text-emerald-500" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <div key={limitation} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted">
                        <X className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {limitation}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
