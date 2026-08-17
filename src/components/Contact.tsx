import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  Check,
  X,
} from 'lucide-react';
import { useBranch } from '@/context/BranchContext';
import { useOpenNow } from '@/hooks/useOpenNow';
import { site } from '@/data/site';

export default function Contact() {
  const { selectedBranch } = useBranch();

  const isOpen = useOpenNow(
    selectedBranch.openTime,
    selectedBranch.closeTime
  );

  const openingHours = [
    ['Monday', '11:00 AM – 1:00 AM'],
    ['Tuesday', '11:00 AM – 1:00 AM'],
    ['Wednesday', '11:00 AM – 1:00 AM'],
    ['Thursday', '11:00 AM – 1:00 AM'],
    ['Friday', '11:00 AM – 1:00 AM'],
    ['Saturday', '11:00 AM – 1:00 AM'],
    ['Sunday', '11:00 AM – 1:00 AM'],
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="container-x">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="section-label">
            Get In Touch
          </span>

          <h2 className="mt-3 text-3xl font-bold text-ink-50 sm:text-4xl lg:text-5xl">
            Visit or Order From {selectedBranch.name}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-400 sm:text-base">
            Reach us on WhatsApp for quick orders, or visit our{' '}
            {selectedBranch.name} location — we&apos;re open daily.
          </p>
        </motion.div>


        {/* =========================
            MAIN CONTENT
        ========================== */}
        <div className="mx-auto mt-12 grid max-w-6xl items-stretch gap-5 lg:grid-cols-2">


          {/* =========================
              LEFT - BRANCH CARD
          ========================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/5 bg-ink-900/60 p-6 sm:p-7"
          >

            {/* BRANCH HEADER */}
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-500">
                <MapPin className="h-6 w-6 text-ink-950" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink-50 sm:text-xl">
                  Dough N Cheese — {selectedBranch.name}
                </h3>

                <div className="mt-0.5 flex items-center gap-1.5">

                  {isOpen ? (
                    <Check className="h-3.5 w-3.5 text-success-500" />
                  ) : (
                    <X className="h-3.5 w-3.5 text-error-500" />
                  )}

                  <span
                    className={`text-xs font-semibold ${
                      isOpen
                        ? 'text-success-500'
                        : 'text-error-500'
                    }`}
                  >
                    {isOpen ? 'Open Now' : 'Closed'}
                  </span>

                </div>
              </div>

            </div>


            {/* =========================
                BRANCH DETAILS
            ========================== */}
            <div className="mt-7 space-y-5">


              {/* ADDRESS */}
              <div className="flex items-start gap-3">

                <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />

                <div>
                  <p className="text-sm font-semibold text-ink-100">
                    Address
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-ink-400">
                    {selectedBranch.address}
                  </p>
                </div>

              </div>


              {/* PHONE / WHATSAPP */}
              <div className="flex items-start gap-3">

                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />

                <div>

                  <p className="text-sm font-semibold text-ink-100">
                    Phone / WhatsApp
                  </p>

                  <a
                    href={`tel:+${selectedBranch.whatsapp}`}
                    className="mt-1 block text-sm text-ink-400 transition-colors hover:text-primary-400"
                  >
                    {selectedBranch.phone}
                  </a>

                </div>

              </div>


              {/* OPENING HOURS */}
              <div className="flex items-start gap-3">

                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />

                <div className="min-w-0 flex-1">

                  <p className="text-sm font-semibold text-ink-100">
                    Opening Hours
                  </p>

                  <div className="mt-2 space-y-2">

                    {openingHours.map(([day, hours]) => (
                      <div
                        key={day}
                        className="flex items-center justify-between gap-4 text-sm"
                      >

                        <span className="text-ink-400">
                          {day}
                        </span>

                        <span className="whitespace-nowrap text-ink-300">
                          {hours}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>

              </div>

            </div>


            {/* =========================
                BUTTONS
            ========================== */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/${selectedBranch.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center"
              >
                <MessageCircle className="h-4 w-4" />
                Order on WhatsApp
              </a>


              {/* DIRECTIONS */}
              <a
                href={selectedBranch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary justify-center"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>

            </div>

          </motion.div>


          {/* =========================
              RIGHT - GOOGLE MAP
          ========================== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="min-h-[420px] overflow-hidden rounded-2xl border border-white/5"
          >

            <iframe
              title={`${selectedBranch.name} map`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                `Dough N Cheese ${selectedBranch.name} ${selectedBranch.address}`
              )}&output=embed`}
              className="h-full min-h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </motion.div>

        </div>


        {/* =========================
            SOCIAL LINKS
        ========================== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex items-center justify-center gap-4"
        >

          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-400 transition-colors hover:text-primary-400"
          >
            Instagram
          </a>

          <span className="text-ink-700">
            ·
          </span>

          <a
            href={site.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-400 transition-colors hover:text-primary-400"
          >
            TikTok
          </a>

          <span className="text-ink-700">
            ·
          </span>

          <a
            href={site.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-400 transition-colors hover:text-primary-400"
          >
            Facebook
          </a>

        </motion.div>

      </div>
    </section>
  );
}