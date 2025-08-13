// Icono del logo principal (velero)
export const SailboatLogoIcon = ({ className = "h-8 w-8 text-sky-700" }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 18.5l-2-4H4l-2 4h20zM3.5 14.5L12 3l8.5 11.5"/>
    <path d="M12 3v11.5"/>
  </svg>
);

// Icono del menú hamburguesa
export const MenuIcon = ({ className = "h-6 w-6 text-white" }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

// Icono del timón
export const RudderIcon = ({ className = "w-16 h-16 mb-4" }) => (
  <img src="/assets/rudder.png" alt="Timón" className={className} />
);

// Icono del velero
export const SailboatIcon = ({ className = "w-16 h-16 text-sky-600 mb-4" }) => (
  <svg 
    className={className}
    viewBox="0 0 64 64" 
    fill="none" 
    aria-hidden="true"
  >
    <path d="M18 50 C 18 50, 46 50, 46 50 C 46 50, 44 44, 40 44 L 24 44 C 24 44, 20 44, 18 50 Z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1"/>
    <path d="M22 44 L 32 14 L 42 44" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
    <line x1="32" y1="14" x2="32" y2="44" stroke="currentColor" strokeWidth="2.5"/>
  </svg>
);

// Icono de dos veleros
export const TwinSailboatsIcon = ({ className = "w-16 h-16 text-sky-600 mb-4" }) => (
  <svg 
    className={className}
    viewBox="0 0 64 64" 
    fill="none"
    aria-hidden="true"
  >
    <path d="M20 52 C 20 52, 42 52, 42 52 C 42 52, 40 47, 37 47 L 25 47 C 25 47, 22 47, 20 52 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
    <path d="M23 47 L 31 20 L 39 47" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
    <line x1="31" y1="20" x2="31" y2="47" stroke="currentColor" strokeWidth="2"/>
    <path d="M38 48 C 38 48, 54 48, 54 48 C 54 48, 52.5 44, 50 44 L 40 44 C 40 44, 39 44, 38 48 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05"/>
    <path d="M41 44 L 47 25 L 53 44" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05"/>
    <line x1="47" y1="25" x2="47" y2="44" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

// Icono del nudo
export const KnotIcon = ({ className = "w-12 h-12 mb-4 mx-auto mt-4" }) => (
  <img src="/assets/knot.png" alt="Nudo" className={className} />
);

// Icono del rumbo
export const RumboIcon = ({ className = "w-16 h-16 mb-4 mx-auto" }) => (
  <img src="/assets/rumbo.png" alt="Rumbo" className={className} />
);

// Icono de rumbos (rosa de los vientos)
export const RumbosIcon = ({ className = "w-16 h-16 text-sky-600 mb-4" }) => (
  <svg className={className} 
    viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.05"/>
    <polygon points="32,10 36,32 32,54 28,32" fill="currentColor" fillOpacity="0.4"/>
    <polygon points="10,32 32,36 54,32 32,28" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="32" cy="32" r="4" fill="currentColor" fillOpacity="0.7"/>
  </svg>
);

// Icono del barco
export const ShipIcon = ({ className = "w-16 h-16 text-sky-600 mb-4" }) => (
  <svg 
    className={className}
    viewBox="0 0 64 64" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10 40 L54 40" />
    <path d="M20 40 L20 20 L44 20 L44 40" />
    <path d="M32 20 L32 10" />
    <path d="M24 40 L24 50 L40 50 L40 40" />
  </svg>
);

// Icono del motor
export const MotorIcon = ({ className = "w-16 h-16 mb-4" }) => (
  <img src="/assets/piston.png" alt="Motor" className={className} />
); 

// Icono del motor con partes (nuevo)
export const BoatEngineIcon = ({ className = "w-16 h-16 mb-4" }) => (
  <img src="/assets/boat-engine.png" alt="Motor fuera de borda" className={className} />
); 

// Icono de la hélice (nuevo)
export const PropellerIcon = ({ className = "w-16 h-16 mb-4" }) => (
  <img src="/assets/propeller.png" alt="Hélice" className={className} />
); 

// Icono del ancla (nuevo)
export const AnchorIcon = ({ className = "w-16 h-16 mb-4" }) => (
  <img src="/assets/anchor.png" alt="Ancla" className={className} />
); 