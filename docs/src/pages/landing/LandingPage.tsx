"use client";

import { HeroSection } from './sections/HeroSection';
import { StatsSection } from './sections/StatsSection';
import { TechStackSection } from './sections/TechStackSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { CategorySection } from './sections/CategorySection';
import { AllComponentsGrid } from './sections/AllComponentsGrid';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { FinalCTASection } from './sections/FinalCTASection';
import { FooterSection } from './sections/FooterSection';
import { componentsByCategory, categoryMetadata } from './data/components';

// Import components for demos
import {
  Button,
  Input,
  Select,
  Checkbox,
  Switch,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Window,
} from '@smc/darwin-ui';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero with centered layout */}
      <HeroSection />

      {/* Stats */}
      <StatsSection />

      {/* Technology Stack */}
      <TechStackSection />

      {/* Features */}
      <FeaturesSection />

      {/* Form Components Category */}
      <CategorySection
        {...categoryMetadata.form}
        components={componentsByCategory.form.map((c) => c.title)}
        imagePosition="right"
        demo={
          <div className="space-y-4 w-full max-w-md">
            <Input placeholder="Enter your name" />
            <Select>
              <option>Select an option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </Select>
            <div className="flex items-center gap-4">
              <Checkbox label="Remember me" defaultChecked />
              <Switch label="Notifications" />
            </div>
            <Button variant="primary" className="w-full">
              Submit Form
            </Button>
          </div>
        }
      />

      {/* Data Components Category */}
      <CategorySection
        {...categoryMetadata.data}
        components={componentsByCategory.data.map((c) => c.title)}
        imagePosition="left"
        demo={
          <div className="space-y-4 w-full">
            <div className="flex gap-2 mb-4">
              <Badge variant="success">Active</Badge>
              <Badge variant="info">New</Badge>
              <Badge variant="warning">Pending</Badge>
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Role</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Developer</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Designer</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>Inactive</TableCell>
                  <TableCell>Manager</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        }
      />

      {/* Feedback Components Category */}
      <CategorySection
        {...categoryMetadata.feedback}
        components={componentsByCategory.feedback.map((c) => c.title)}
        imagePosition="right"
        demo={
          <div className="space-y-4 w-full max-w-md">
            <div className="rounded-lg border border-green-500/30 bg-gradient-to-br from-green-500/20 to-green-500/5 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm mb-1">
                    Success!
                  </p>
                  <p className="text-white/70 text-xs">
                    Your changes have been saved
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-500/5 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  i
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm mb-1">
                    Information
                  </h4>
                  <p className="text-white/70 text-xs">
                    New features are available
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* Layout Components Category */}
      <CategorySection
        {...categoryMetadata.layout}
        components={componentsByCategory.layout.map((c) => c.title)}
        imagePosition="left"
        demo={
          <div className="space-y-4 w-full max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/60 text-sm">
                  Your application metrics and insights
                </p>
              </CardContent>
            </Card>

            <Window title="Application Window">
              <div className="p-6 text-sm text-white/80">
                macOS-style window with traffic lights
              </div>
            </Window>
          </div>
        }
      />

      {/* All Components Grid */}
      <AllComponentsGrid />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA */}
      <FinalCTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
