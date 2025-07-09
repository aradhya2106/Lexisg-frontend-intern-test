import React, { useState } from 'react';

const LexiLegalAssistant = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Simulated API response
  const simulatedResponse = {
    answer: "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased's annual income should be added as future prospects.",
    citations: [
      {
        text: "as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
        source: "Dani_Devi_v_Pritam_Singh.pdf",
        paragraph: "Para 7 of the document",
        link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz"
      }
    ]
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setResponse(simulatedResponse);
      setIsLoading(false);
    }, 1500);
  };

  const handleCitationClick = (citation) => {
    // Open PDF in new tab
    window.open(citation.link, '_blank');
    
    // Optional: Log citation click for analytics
    console.log(`Citation clicked: ${citation.source} - ${citation.paragraph}`);
  };

  const handleReset = () => {
    setQuery('');
    setResponse(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Lexi Legal Assistant</h1>
        <p style={styles.subtitle}>Ask your legal questions and get answers with citations</p>
      </div>

      <div style={styles.mainContent}>
        {/* Input Panel */}
        <div style={styles.inputPanel}>
          <div style={styles.form}>
            <div style={styles.inputGroup}>
              <div style={styles.label}>
                Legal Query
              </div>
              <textarea
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your legal question here..."
                style={styles.textarea}
                rows={4}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            
            <div style={styles.buttonGroup}>
              <button
                onClick={handleSubmit}
                disabled={isLoading || !query.trim()}
                style={{
                  ...styles.submitButton,
                  ...(isLoading || !query.trim() ? styles.buttonDisabled : {})
                }}
              >
                {isLoading ? (
                  <span style={styles.loadingText}>
                    <span style={styles.spinner}></span>
                    Analyzing...
                  </span>
                ) : (
                  'Submit Query'
                )}
              </button>
              
              {response && (
                <button
                  onClick={handleReset}
                  style={styles.resetButton}
                >
                  Ask New Question
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Answer Panel */}
        {response && (
          <div style={styles.answerPanel}>
            <div style={styles.answerCard}>
              <h3 style={styles.answerTitle}>Answer</h3>
              <p style={styles.answerText}>{response.answer}</p>
              
              {/* Citations */}
              <div style={styles.citationsSection}>
                <h4 style={styles.citationsTitle}>Citations</h4>
                {response.citations.map((citation, index) => (
                  <div key={index} style={styles.citationCard}>
                    <p style={styles.citationText}>
                      "{citation.text}"
                    </p>
                    <div style={styles.citationMeta}>
                      <span style={styles.citationSource}>
                        {citation.paragraph}
                      </span>
                      <button
                        onClick={() => handleCitationClick(citation)}
                        style={styles.citationLink}
                      >
                        📄 Open {citation.source}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#64748b',
    margin: 0
  },
  mainContent: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  inputPanel: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    lineHeight: '1.5',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease',
    outline: 'none',
    boxSizing: 'border-box'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: '140px',
    justifyContent: 'center'
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8',
    cursor: 'not-allowed'
  },
  resetButton: {
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  },
  loadingText: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTop: '2px solid currentColor',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    display: 'inline-block'
  },
  answerPanel: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    overflow: 'hidden'
  },
  answerCard: {
    padding: '24px'
  },
  answerTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px',
    margin: '0 0 16px 0'
  },
  answerText: {
    fontSize: '1rem',
    lineHeight: '1.7',
    color: '#374151',
    marginBottom: '24px'
  },
  citationsSection: {
    borderTop: '1px solid #e2e8f0',
    paddingTop: '24px'
  },
  citationsTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '16px',
    margin: '0 0 16px 0'
  },
  citationCard: {
    backgroundColor: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px'
  },
  citationText: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: '#475569',
    fontStyle: 'italic',
    marginBottom: '12px'
  },
  citationMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px'
  },
  citationSource: {
    fontSize: '0.85rem',
    color: '#64748b',
    fontWeight: '500'
  },
  citationLink: {
    backgroundColor: '#059669',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  }
};

// Add CSS animation for spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  textarea:focus {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .citation-link:hover {
    background-color: #047857 !important;
  }
  
  .submit-button:hover:not(:disabled) {
    background-color: #2563eb !important;
  }
  
  .reset-button:hover {
    background-color: #4b5563 !important;
  }
`;
document.head.appendChild(styleSheet);

export default LexiLegalAssistant;