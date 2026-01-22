"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Button, Badge, Input, Switch, Checkbox,
  Progress, Slider, Avatar, AvatarGroup,
  Card, CardHeader, CardTitle, CardContent
} from '@pikoloo/darwin-ui';

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function ComponentCard({ title, children, delay = 0, className = '' }: ComponentCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={`relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden group ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite'
        }}
      />
      <p className="text-xs text-white/40 uppercase tracking-wider mb-4">{title}</p>
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export function ComponentGridSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <section ref={sectionRef} className="min-h-screen py-16 md:py-20 lg:py-24 xl:py-28 px-4 relative">
      <motion.div
        className="text-center mb-16 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Beautiful Components</h2>
        <p className="text-lg text-white/50">36+ production-ready components with smooth animations and accessibility built-in.</p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ComponentCard title="Buttons" delay={0.1} className="sm:col-span-2">
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </ComponentCard>

        <ComponentCard title="Badges" delay={0.15}>
          <div className="flex flex-wrap gap-2">
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="info">New</Badge>
          </div>
        </ComponentCard>

        <ComponentCard title="Input" delay={0.2}>
          <Input placeholder="Enter your email..." />
        </ComponentCard>

        <ComponentCard title="Toggles" delay={0.25}>
          <div className="space-y-3">
            <Switch label="Dark mode" defaultChecked />
            <Switch label="Notifications" />
          </div>
        </ComponentCard>

        <ComponentCard title="Checkboxes" delay={0.3}>
          <div className="space-y-2">
            <Checkbox label="Remember me" defaultChecked />
            <Checkbox label="Send updates" />
          </div>
        </ComponentCard>

        <ComponentCard title="Progress" delay={0.35} className="sm:col-span-2">
          <div className="space-y-4">
            <Progress value={75} showValue />
            <Progress value={45} variant="success" />
          </div>
        </ComponentCard>

        <ComponentCard title="Slider" delay={0.4}>
          <Slider defaultValue={60} />
        </ComponentCard>

        <ComponentCard title="Avatar" delay={0.45}>
          <AvatarGroup max={3}>
            <Avatar fallback="JD" size="sm" />
            <Avatar fallback="SM" size="sm" />
            <Avatar fallback="AK" size="sm" />
            <Avatar fallback="+2" size="sm" />
          </AvatarGroup>
        </ComponentCard>

        <ComponentCard title="Cards" delay={0.5} className="lg:col-span-2">
          <Card className="bg-white/[0.02]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/50">Your weekly report is ready.</p>
            </CardContent>
          </Card>
        </ComponentCard>
      </div>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        <a href="/docs" className="inline-flex items-center text-white/60 hover:text-white transition-colors group">
          View all 36+ components
          <motion.span className="ml-2" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
        </a>
      </motion.div>
    </section>
  );
}
