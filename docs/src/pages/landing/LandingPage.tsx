"use client";

import { HeroSection } from './sections/HeroSection';
import { StatsSection } from './sections/StatsSection';
import { TechStackSection } from './sections/TechStackSection';
import { CategorySection } from './sections/CategorySection';
import { AllComponentsGrid } from './sections/AllComponentsGrid';
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
  DateSelect,
  MultiSelect,
} from '@smc/darwin-ui';
import { useState } from 'react';

export default function LandingPage() {
  // State for form demo
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [multiSelectValues, setMultiSelectValues] = useState<string[]>(['react']);
  const [country, setCountry] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [notifications, setNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero with centered layout */}
      <HeroSection />

      {/* Stats */}
      <StatsSection />

      {/* Technology Stack */}
      <TechStackSection />

      {/* Form Components Category - ENHANCED */}
      <CategorySection
        {...categoryMetadata.form}
        components={componentsByCategory.form.map((c) => c.title)}
        imagePosition="right"
        demo={
          <div className="space-y-4 w-full max-w-md">
            <Input placeholder="Full Name" />
            <Input type="email" placeholder="Email Address" />
            <Input type="password" placeholder="Password" />
            <Select value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Select your country</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
            </Select>
            <MultiSelect
              options={[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue' },
                { value: 'angular', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
              ]}
              value={multiSelectValues}
              onChange={setMultiSelectValues}
              placeholder="Select frameworks"
            />
            <DateSelect
              value={selectedDate}
              onChange={(config) => setSelectedDate(config.startDate)}
            />
            <div className="space-y-3">
              <Checkbox label="Remember me" checked={rememberMe} onChange={setRememberMe} />
              <Checkbox label="Subscribe to newsletter" checked={newsletter} onChange={setNewsletter} />
              <Switch label="Enable notifications" checked={notifications} onChange={setNotifications} />
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

      {/* All Components Grid */}
      <AllComponentsGrid />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
