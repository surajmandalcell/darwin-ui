"use client";

import { motion } from 'framer-motion';
import { Button, Badge, Switch, Slider, Progress } from '@pikoloo/darwin-ui';
import { Plus, Settings } from 'lucide-react';
import { DarwinLogo } from '../icons/DarwinLogo';
import { FloatingElement } from './FloatingElement';

export function HeroComponentPreview() {
  return (
    <div className="relative">
      {/* Main card */}
      <FloatingElement pattern="figure8" depth={2} duration={8}>
        <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <DarwinLogo showBackground className="w-10 h-10" />
            <div>
              <div className="text-sm font-medium text-foreground">Darwin UI</div>
              <div className="text-xs text-muted-foreground">Component Library</div>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Buttons cell */}
            <motion.div
              className="bg-muted/50 border border-border/60 rounded-xl p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Buttons</div>
              <div className="flex flex-wrap gap-1.5">
                <Button variant="default" size="sm" className="text-xs h-7 px-2">Primary</Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Plus className="h-3.5 w-3.5" />
                </Button>
                <Button variant="secondary" size="icon" className="h-7 w-7">
                  <Settings className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>

            {/* Badges cell */}
            <motion.div
              className="bg-muted/50 border border-border/60 rounded-xl p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Badges</div>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="default" className="text-[10px]">Default</Badge>
                <Badge variant="secondary" className="text-[10px]">Secondary</Badge>
              </div>
            </motion.div>

            {/* Controls cell - spans full width */}
            <motion.div
              className="col-span-2 bg-muted/50 border border-border/60 rounded-xl p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Controls</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Dark Mode</span>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Volume</span>
                    <span className="text-xs text-foreground/70">65%</span>
                  </div>
                  <Slider defaultValue={65} max={100} step={1} className="w-full" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <Progress value={72} className="h-1.5" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </FloatingElement>

      {/* Floating user avatar card - top right */}
      <FloatingElement
        pattern="orbit"
        depth={3}
        duration={6}
        delay={0.5}
        className="absolute -top-6 -right-6"
      >
        <div className="bg-muted/30 backdrop-blur border border-border/80 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-medium text-white">
              JD
            </div>
            <div className="text-xs">
              <div className="text-foreground/80">John Doe</div>
              <div className="text-muted-foreground">Online</div>
            </div>
          </div>
        </div>
      </FloatingElement>

      {/* Floating build status card - bottom left */}
      <FloatingElement
        pattern="drift"
        depth={1}
        duration={7}
        delay={1}
        className="absolute -bottom-4 -left-8"
      >
        <div className="bg-muted/30 backdrop-blur border border-border/80 rounded-xl p-3 px-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-muted-foreground">Build passing</span>
          </div>
        </div>
      </FloatingElement>
    </div>
  );
}

export default HeroComponentPreview;
