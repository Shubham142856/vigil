import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlowField } from './components/FlowField';
import { BrandLogos } from './components/BrandLogos';
import { ContentSections } from './components/ContentSections';
import { StatefulExecutionSection } from './components/StatefulExecutionSection';
import { DurableAutonomySection } from './components/DurableAutonomySection';
import { AgentInsightsSection } from './components/AgentInsightsSection';
import { CelestialCTASection } from './components/CelestialCTASection';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { GetStartedModal } from './components/GetStartedModal';

// Review Console Components
import { Sidebar, VigilTab } from './components/vigil/Sidebar';
import { Topbar } from './components/vigil/Topbar';
import { ReviewWorkspace } from './components/vigil/ReviewWorkspace';
import { DashboardView } from './components/vigil/DashboardView';
import { NewReviewView } from './components/vigil/NewReviewView';
import { ReportsView } from './components/vigil/ReportsView';
import { EvaluationView } from './components/vigil/EvaluationView';
import { GitHubView } from './components/vigil/GitHubView';
import { PatchesView } from './components/vigil/PatchesView';
import { AgentsView } from './components/vigil/AgentsView';
import { SettingsView } from './components/vigil/SettingsView';
import {
  CURRENT_USER,
  INITIAL_REVIEWS,
  INITIAL_FINDINGS,
  INITIAL_REPORTS,
  INITIAL_EVALUATIONS,
  INITIAL_REPOS,
  INITIAL_PATCHES,
  INITIAL_AGENTS,
} from './data/vigilData';
import { Review, Finding, Feedback } from './types/vigil';
import { Check, Info, ArrowLeft } from 'lucide-react';

export default function App() {
  // Navigation mode: 'landing' (default) or 'console'
  const [viewMode, setViewMode] = useState<'landing' | 'console'>('landing');

  // Modals state
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false);

  // Review console state
  const [activeTab, setActiveTab] = useState<VigilTab>('workspace');
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [findings, setFindings] = useState<Finding[]>(INITIAL_FINDINGS);
  const [activeReviewId, setActiveReviewId] = useState<string>('rev-a1b2');
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [evaluations, setEvaluations] = useState(INITIAL_EVALUATIONS);
  const [repos, setRepos] = useState(INITIAL_REPOS);
  const [patches, setPatches] = useState(INITIAL_PATCHES);
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [user] = useState(CURRENT_USER);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const activeReview = reviews.find((r) => r.id === activeReviewId) || reviews[0];
  const activeFindings = findings.filter((f) => f.reviewId === activeReview?.id);

  const handleSelectReview = (reviewId: string) => {
    setActiveReviewId(reviewId);
    setActiveTab('workspace');
  };

  const handleDeleteReview = (reviewId: string) => {
    const target = reviews.find((r) => r.id === reviewId);
    if (target?.legalHold) {
      showToast('Error 423: Deletion strictly blocked by compliance legal hold.');
      return;
    }

    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    setFindings((prev) => prev.filter((f) => f.reviewId !== reviewId));
    showToast(`Review #${reviewId} purged permanently from tenant records.`);

    const remaining = reviews.filter((r) => r.id !== reviewId);
    if (remaining.length > 0) {
      setActiveReviewId(remaining[0].id);
      setActiveTab('dashboard');
    } else {
      setActiveTab('new_review');
    }
  };

  const handleFeedback = (findingId: string, feedback: Feedback) => {
    setFindings((prev) =>
      prev.map((f) => {
        if (f.id !== findingId) return f;
        const currentFeedback = f.userFeedback;
        const newFeedback =
          currentFeedback?.type === feedback.type && !feedback.comment ? undefined : feedback;
        return { ...f, userFeedback: newFeedback };
      })
    );

    const typeLabel =
      feedback.type === 'helpful'
        ? 'Helpful'
        : feedback.type === 'not_helpful'
        ? 'Not Helpful'
        : feedback.type === 'false_positive'
        ? 'False Positive Flagged'
        : feedback.type === 'incorrect_patch'
        ? 'Incorrect Patch Flagged'
        : 'Feedback Recorded';
    showToast(`${typeLabel}: Saved to active tenant learning baseline.`);
  };

  const handleCreateReview = (newReview: Review, newFindings?: Finding[]) => {
    setReviews((prev) => [newReview, ...prev]);
    if (newFindings && newFindings.length > 0) {
      setFindings((prev) => [...newFindings, ...prev]);
    }
    setActiveReviewId(newReview.id);
    setActiveTab('workspace');
    showToast(`Code analysis launched: ${newReview.title}`);
  };

  // Smooth scroll handler for navbar & footer links
  const handleScrollTo = (item: string) => {
    const key = item.toLowerCase();
    if (key.includes('about')) {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (key.includes('capabilit') || key.includes('feature')) {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    } else if (key.includes('pipe') || key.includes('execut')) {
      document.getElementById('execution')?.scrollIntoView({ behavior: 'smooth' });
    } else if (key.includes('verif') || key.includes('autonom')) {
      document.getElementById('verification')?.scrollIntoView({ behavior: 'smooth' });
    } else if (key.includes('insight') || key.includes('bench')) {
      document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' });
    } else if (key.includes('pricing')) {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    } else if (key.includes('testimonial')) {
      document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If in console view mode
  if (viewMode === 'console') {
    return (
      <div className="flex h-screen w-screen overflow-hidden bg-black text-white font-sans selection:bg-white selection:text-black">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          user={user}
          pendingReviewsCount={reviews.filter((r) => r.status !== 'complete').length}
          onBackToSite={() => setViewMode('landing')}
        />

        {/* Main View Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-black">
          <Topbar
            activeTab={activeTab}
            user={user}
            onNewReview={() => setActiveTab('new_review')}
            activeReview={activeTab === 'workspace' ? activeReview : undefined}
            onBackToOverview={() => setActiveTab('dashboard')}
            onBackToSite={() => setViewMode('landing')}
          />

          <main className="flex-1 overflow-hidden relative">
            {activeTab === 'workspace' && activeReview && (
              <ReviewWorkspace
                review={activeReview}
                findings={activeFindings}
                onFeedback={handleFeedback}
                onDeleteReview={() => handleDeleteReview(activeReview.id)}
              />
            )}

            {activeTab === 'dashboard' && (
              <DashboardView
                reviews={reviews}
                findings={findings}
                onSelectReview={handleSelectReview}
                onNewReview={() => setActiveTab('new_review')}
              />
            )}

            {activeTab === 'new_review' && (
              <NewReviewView
                onCreateReview={handleCreateReview}
                onCancel={() => setActiveTab('dashboard')}
              />
            )}

            {activeTab === 'reports' && (
              <ReportsView reports={reports} activeReview={activeReview} />
            )}

            {activeTab === 'evaluation' && (
              <EvaluationView evaluations={evaluations} />
            )}

            {activeTab === 'github' && (
              <GitHubView
                repos={repos}
                onSyncRepo={(repoId: string) => {
                  setRepos((prev) =>
                    prev.map((r) =>
                      r.id === repoId ? { ...r, lastReviewStatus: 'clean' } : r
                    )
                  );
                  showToast(`Repository #${repoId} webhook synchronized.`);
                }}
              />
            )}

            {activeTab === 'patches' && (
              <PatchesView patches={patches} />
            )}

            {activeTab === 'agents' && (
              <AgentsView agents={agents} />
            )}

            {activeTab === 'settings' && <SettingsView user={user} />}
          </main>
        </div>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 bg-black/95 text-xs text-white shadow-2xl animate-in fade-in slide-in-from-bottom-2 backdrop-blur-md">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // Primary Landing Page View
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden font-sans">
      {/* Above the fold: Hero screen with FlowField fluid canvas background */}
      <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black">
        {/* Real-time interactive cyclone fluid dynamics canvas */}
        <FlowField interactive={true} />

        {/* Top Floating Navigation */}
        <Navbar
          onRequestDemo={() => setDemoModalOpen(true)}
          onGetStarted={() => setGetStartedModalOpen(true)}
          onLinkClick={handleScrollTo}
          onOpenConsole={() => setViewMode('console')}
        />

        {/* Hero Section */}
        <Hero
          onGetStarted={() => setGetStartedModalOpen(true)}
          onRequestDemo={() => setDemoModalOpen(true)}
        />

        {/* Brand Logos Bar */}
        <BrandLogos />
      </div>

      {/* Content Sections: The Vigil Approach & Capabilities */}
      <ContentSections
        onOpenGetStarted={() => setGetStartedModalOpen(true)}
        onOpenDemo={() => setDemoModalOpen(true)}
      />

      {/* Stateful Execution Section: Interactive Task Schedules & Agents */}
      <StatefulExecutionSection
        onGetStarted={() => setGetStartedModalOpen(true)}
        onRequestDemo={() => setDemoModalOpen(true)}
      />

      {/* Durable Autonomy Section: Enterprise Policy Guardrails & Approvals */}
      <DurableAutonomySection
        onGetStarted={() => setGetStartedModalOpen(true)}
        onRequestDemo={() => setDemoModalOpen(true)}
      />

      {/* Agent Insights Section: Stacked Distribution & Model Performance */}
      <AgentInsightsSection
        onGetStarted={() => setGetStartedModalOpen(true)}
        onRequestDemo={() => setDemoModalOpen(true)}
      />

      {/* Celestial Streamlines CTA Section with upward streaming canvas */}
      <CelestialCTASection
        onGetStarted={() => setGetStartedModalOpen(true)}
        onRequestDemo={() => setDemoModalOpen(true)}
      />

      {/* Technical Footer */}
      <Footer
        onLinkClick={handleScrollTo}
        onRequestDemo={() => setDemoModalOpen(true)}
        onGetStarted={() => setGetStartedModalOpen(true)}
      />

      {/* Interactive Modals */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onOpenConsole={() => setViewMode('console')}
        isAegisMode={true}
      />

      <GetStartedModal
        isOpen={getStartedModalOpen}
        onClose={() => setGetStartedModalOpen(false)}
        isAegisMode={true}
      />
    </div>
  );
}
