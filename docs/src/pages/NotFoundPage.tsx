"use client";

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, FileQuestion, ArrowLeft } from 'lucide-react';
import { Button } from '@pikoloo/darwin-ui';
import { UnifiedNavbar } from '../components/UnifiedNavbar';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <UnifiedNavbar />

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Icon */}
          <motion.div
            className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-muted/50 border border-border"
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <FileQuestion className="w-12 h-12 text-muted-foreground" />
          </motion.div>

          {/* Error Code */}
          <motion.div
            className="text-8xl font-bold text-foreground/10 mb-2 font-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            404
          </motion.div>

          {/* Message */}
          <motion.h1
            className="text-2xl font-semibold text-foreground mb-3 font-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Page not found
          </motion.h1>

          <motion.p
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>

          {/* Actions */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/">
              <Button variant="default" className="gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="secondary" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                View Docs
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
