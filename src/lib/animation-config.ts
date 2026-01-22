/**
 * Darwin UI Animation Configuration
 *
 * Centralized animation settings for consistent, configurable animations.
 * Supports prefers-reduced-motion and allows disabling specific animation types.
 */

export type DurationKey = "instant" | "fast" | "normal" | "slow" | "reveal";
export type SpringKey = "snappy" | "smooth" | "gentle";

export interface SpringConfig {
	type: "spring";
	stiffness: number;
	damping: number;
}

export interface AnimationConfig {
	/** Master switch to enable/disable all animations */
	enabled: boolean;

	/** Duration presets in seconds */
	durations: Record<DurationKey, number>;

	/** Spring animation presets */
	springs: Record<SpringKey, SpringConfig>;

	/** Disable specific animation types */
	disable: {
		/** Disable hover animations (whileHover) */
		hover: boolean;
		/** Disable entrance/mount animations */
		entrance: boolean;
		/** Disable exit/unmount animations */
		exit: boolean;
		/** Disable scale transforms */
		scale: boolean;
	};
}

/**
 * Default animation configuration
 * Can be modified at runtime to change animation behavior globally
 */
export const ANIMATION_CONFIG: AnimationConfig = {
	enabled: true,

	durations: {
		instant: 0,
		fast: 0.1,
		normal: 0.15,
		slow: 0.2,
		reveal: 0.4,
	},

	springs: {
		snappy: { type: "spring", stiffness: 400, damping: 25 },
		smooth: { type: "spring", stiffness: 200, damping: 25 },
		gentle: { type: "spring", stiffness: 120, damping: 20 },
	},

	disable: {
		hover: false,
		entrance: false,
		exit: false,
		scale: false,
	},
};

/**
 * Check if user prefers reduced motion
 * Returns true if the user has enabled "Reduce motion" in their OS settings
 */
export function prefersReducedMotion(): boolean {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get duration value respecting reduced motion preference
 * Returns 0 if animations are disabled or user prefers reduced motion
 */
export function getDuration(key: DurationKey): number {
	if (!ANIMATION_CONFIG.enabled || prefersReducedMotion()) return 0;
	return ANIMATION_CONFIG.durations[key];
}

/**
 * Get spring config respecting reduced motion preference
 * Returns instant spring (high stiffness, high damping) if reduced motion is preferred
 */
export function getSpring(key: SpringKey): SpringConfig {
	if (!ANIMATION_CONFIG.enabled || prefersReducedMotion()) {
		return { type: "spring", stiffness: 1000, damping: 100 };
	}
	return ANIMATION_CONFIG.springs[key];
}

/**
 * Check if a specific animation type is enabled
 */
export function isAnimationEnabled(
	type: keyof AnimationConfig["disable"],
): boolean {
	if (!ANIMATION_CONFIG.enabled || prefersReducedMotion()) return false;
	return !ANIMATION_CONFIG.disable[type];
}

/**
 * Get transition object for Framer Motion
 * Respects reduced motion and disabled animation types
 */
export function getTransition(
	duration: DurationKey = "normal",
): { duration: number } {
	return { duration: getDuration(duration) };
}

/**
 * Configure animations globally
 * Call this early in your app to customize animation behavior
 *
 * @example
 * // Disable all hover animations
 * configureAnimations({ disable: { hover: true } });
 *
 * // Speed up all animations
 * configureAnimations({
 *   durations: { fast: 0.05, normal: 0.1, slow: 0.15 }
 * });
 *
 * // Disable all animations
 * configureAnimations({ enabled: false });
 */
export function configureAnimations(
	config: Partial<AnimationConfig>,
): void {
	if (config.enabled !== undefined) {
		ANIMATION_CONFIG.enabled = config.enabled;
	}
	if (config.durations) {
		Object.assign(ANIMATION_CONFIG.durations, config.durations);
	}
	if (config.springs) {
		Object.assign(ANIMATION_CONFIG.springs, config.springs);
	}
	if (config.disable) {
		Object.assign(ANIMATION_CONFIG.disable, config.disable);
	}
}
