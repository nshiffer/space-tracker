import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'pixel-retroui'
import { theme } from '../theme'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const faqs = [
  {
    q: 'How often is launch data updated?',
    a: 'Launch data comes from The Space Devs API which is updated in real-time by a community of space enthusiasts and professionals. Launch times, statuses, and details are updated as soon as new information becomes available from launch providers.',
  },
  {
    q: 'What do the different launch statuses mean?',
    a: 'GO means all systems are ready and the launch is approved. TBD means the date is set but not confirmed. HOLD means the countdown has been paused for some reason. IN FLIGHT means the rocket has launched. SUCCESS means mission objectives were achieved. FAILURE indicates an anomaly occurred.',
  },
  {
    q: 'Can I watch launches live?',
    a: 'Yes! When live streams are available, you will see a "WATCH LIVE" section in the launch details. These are typically YouTube streams from the launch provider or space news organizations. Not all launches have live coverage.',
  },
  {
    q: 'Why are some launch times listed as TBD?',
    a: 'Launch scheduling is complex. Many factors can affect the exact timing: weather conditions, technical readiness, range conflicts with other launches, and orbital mechanics. Some launches are announced months in advance with only an approximate date.',
  },
  {
    q: 'What happens during a launch hold?',
    a: 'A hold pauses the countdown clock. Common reasons include unexpected weather changes, technical anomalies in the rocket or ground systems, boats or aircraft entering the range exclusion zone, or issues with the payload. Holds can last minutes or result in a scrub (postponement).',
  },
  {
    q: 'What is a scrub?',
    a: 'A scrub is when a launch attempt is called off before liftoff. The rocket remains on the pad and a new launch date is set. Scrubs are a normal part of spaceflight and prioritize safety over schedule.',
  },
  {
    q: 'How do reusable rockets work?',
    a: 'Companies like SpaceX land their first stage boosters after separation, either on a drone ship at sea or a landing pad near the launch site. The booster is refurbished and flown again, dramatically reducing launch costs. Some Falcon 9 boosters have flown over 20 times.',
  },
  {
    q: 'Where do rockets launch from?',
    a: 'Major launch sites include Cape Canaveral and Kennedy Space Center (Florida, USA), Vandenberg Space Force Base (California, USA), Baikonur Cosmodrome (Kazakhstan), Guiana Space Centre (French Guiana), and various sites in China, India, Japan, and New Zealand. Launch sites near the equator benefit from Earth\'s rotational speed.',
  },
  {
    q: 'How do I save my favorite launches?',
    a: 'Click the SAVE button on any launch card or in the launch detail view. Your saved launches are stored locally in your browser. You can view all saved launches by clicking the SAVED button in the filter bar.',
  },
  {
    q: 'Is this data free to use?',
    a: 'LNCH CTRL is free to use. The launch data comes from The Space Devs, a community-driven open API. News data comes from the Spaceflight News API. Both are free for non-commercial use.',
  },
]

function FAQ() {
  useDocumentTitle('FAQ - LNCH CTRL')

  return (
    <div className="max-w-[800px] px-4 md:px-6 py-8" style={{ margin: '0 auto' }}>
      <h2 className="font-pixel text-sm mb-6 glow-green" style={{ color: theme.green }}>
        &gt; FAQ
      </h2>

      <p className="font-retro text-xl mb-6 leading-relaxed" style={{ color: theme.text }}>
        Common questions about space launches and how to use LNCH CTRL.
      </p>

      <Accordion
        collapsible={true}
        bg={theme.panel}
        textColor={theme.text}
        borderColor={theme.border}
        shadowColor="transparent"
      >
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>
              <span className="font-pixel text-[8px] leading-[1.8]">{faq.q.toUpperCase()}</span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="font-retro text-xl leading-relaxed py-2" style={{ color: theme.text }}>
                {faq.a}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQ
