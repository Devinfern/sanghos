import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'gilroy': ['Gilroy', 'sans-serif'],
				'sans': ['Gilroy', 'Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sand: {
					50: '#f9f7f4',
					100: '#f2efe9',
					200: '#e5e0d5',
					300: '#d5cbb6',
					400: '#c2b395',
					500: '#b09c7b',
					600: '#a18a6d',
					700: '#86725c',
					800: '#6e5e4c',
					900: '#5a4d40',
					950: '#302821',
				},
				sage: {
					50: '#f4f7f4',
					100: '#e5ebe5',
					200: '#cedacf',
					300: '#abbfad',
					400: '#839e87',
					500: '#64806a',
					600: '#4e6653',
					700: '#3f5243',
					800: '#354538',
					900: '#2d392f',
					950: '#151e17',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			spacing: {
				'section': '5rem',
				'section-sm': '3rem',
				'section-lg': '8rem',
				'content': '2.5rem',
				'content-sm': '1.5rem',
				'content-lg': '4rem',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'blur-in': {
					'0%': { 
						filter: 'blur(5px)',
						opacity: '0'
					},
					'100%': {
						filter: 'blur(0)',
						opacity: '1'
					}
				},
				'button-pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.02)' }
				},
				'button-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				},
				'button-ripple': {
					'0%': { 
						transform: 'scale(0)',
						opacity: '0.7'
					},
					'100%': { 
						transform: 'scale(1.5)',
						opacity: '0'
					}
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slide-up': 'slide-up 0.4s ease-out forwards',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'fade-up': 'fade-up 0.6s ease-out forwards',
				'blur-in': 'blur-in 0.6s ease-out forwards',
				'button-pulse': 'button-pulse 2s ease-in-out infinite',
				'button-bounce': 'button-bounce 1s ease-in-out infinite',
				'button-ripple': 'button-ripple 0.6s linear',
				'wiggle': 'wiggle 0.3s ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
