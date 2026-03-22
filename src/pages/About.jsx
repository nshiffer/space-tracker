import { Card } from 'pixel-retroui'
import { theme } from '../theme'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function About() {
  useDocumentTitle('About - LNCH CTRL')

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-6 py-8">
      <h2 className="font-pixel text-sm mb-6 glow-green" style={{ color: theme.green }}>
        &gt; ABOUT LNCH CTRL
      </h2>

      <Card bg={theme.panel} textColor={theme.text} borderColor={theme.border} shadowColor="transparent" className="p-5 mb-6">
        <h3 className="font-pixel text-[10px] mb-3" style={{ color: theme.blue }}>
          WHAT IS THIS?
        </h3>
        <p className="font-retro text-xl leading-relaxed mb-4" style={{ color: theme.text }}>
          LNCH CTRL is a real-time space launch tracker that lets you follow upcoming and past rocket launches
          from agencies around the world. Track countdowns, explore mission details, watch live streams, and
          save your favorite launches.
        </p>
        <p className="font-retro text-xl leading-relaxed" style={{ color: theme.text }}>
          Whether you are a space enthusiast, an aerospace professional, or just curious about what is
          happening above the atmosphere, LNCH CTRL keeps you connected to every launch event on the planet.
        </p>
      </Card>

      <Card bg={theme.panel} textColor={theme.text} borderColor={theme.border} shadowColor="transparent" className="p-5 mb-6">
        <h3 className="font-pixel text-[10px] mb-3" style={{ color: theme.yellow }}>
          DATA SOURCES
        </h3>
        <div className="font-retro text-xl leading-relaxed flex flex-col gap-3">
          <p>
            <span style={{ color: theme.blue }}>Launch Data:</span>{' '}
            <a href="https://thespacedevs.com/" target="_blank" rel="noopener noreferrer"
              className="no-underline hover:underline" style={{ color: theme.green }}>
              The Space Devs API
            </a>{' '}
            &mdash; a community-driven API providing comprehensive data on space launches, agencies,
            astronauts, and space stations.
          </p>
          <p>
            <span style={{ color: theme.blue }}>News:</span>{' '}
            <a href="https://spaceflightnewsapi.net/" target="_blank" rel="noopener noreferrer"
              className="no-underline hover:underline" style={{ color: theme.green }}>
              Spaceflight News API
            </a>{' '}
            &mdash; aggregating space news from trusted sources including NASA, SpaceNews, and more.
          </p>
        </div>
      </Card>

      <Card bg={theme.panel} textColor={theme.text} borderColor={theme.border} shadowColor="transparent" className="p-5 mb-6">
        <h3 className="font-pixel text-[10px] mb-3" style={{ color: theme.purple }}>
          FEATURES
        </h3>
        <ul className="font-retro text-xl leading-relaxed list-none flex flex-col gap-2">
          <li>&gt; Real-time countdown timers for upcoming launches</li>
          <li>&gt; Detailed mission information and orbital parameters</li>
          <li>&gt; Links to live video streams when available</li>
          <li>&gt; Save favorite launches for quick access</li>
          <li>&gt; Search and filter through hundreds of launches</li>
          <li>&gt; Latest space news from top sources</li>
          <li>&gt; Grid and list view modes</li>
          <li>&gt; Launch statistics and provider analytics</li>
        </ul>
      </Card>

      <Card bg={theme.panel} textColor={theme.text} borderColor={theme.border} shadowColor="transparent" className="p-5">
        <h3 className="font-pixel text-[10px] mb-3" style={{ color: theme.green }}>
          OPEN SOURCE
        </h3>
        <p className="font-retro text-xl leading-relaxed">
          LNCH CTRL is open source and built with React, Vite, pixel-retroui, and Tailwind CSS.
          The retro 8-bit aesthetic is inspired by classic NES and arcade game interfaces,
          bringing a nostalgic feel to modern space tracking.
        </p>
      </Card>
    </div>
  )
}

export default About
