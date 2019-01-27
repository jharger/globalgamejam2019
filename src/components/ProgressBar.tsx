import * as React from 'react';

interface Props {
  children: React.ReactNode;
  width: number;
}

class ProgressBar extends React.Component<Props> {
  bar = React.createRef<HTMLDivElement>();

  setProgress(progress: number) {
    if (progress < 0 || progress > 1) {
      return;
    }

    if (this.bar.current) {
      this.bar.current.style.width = `${progress * 100}%`;
    }
  }

  render() {
    const { width, children } = this.props;
    return (
      <div
        style={{
          width: `${width}px`,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid #888',
        }}
      >
        <div
          ref={this.bar}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            width: 0,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
          }}
        />
        {children}
      </div>
    );
  }
}

export default ProgressBar;
