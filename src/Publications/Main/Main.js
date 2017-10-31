import React from 'react';
import './Main.css'

const publicationMain = (props) => (
    <div className="pub-main">
        <div className="pub-subj"><span className="color">J</span>ournal Publications</div>
        <div className="pub-content">
            <div className="pub-title">
                A. Tang, Y. Yang, C.-Y. Lee, and N. K. Jha, 
                “McPAT-PVT: Delay and power modeling framework for FinFET processor architectures under PVT variations,”
                 IEEE Trans. Very Large Scale Integration Systems, vol. 23, no. 9, Sep. 2015, pp. 1616-1627.
            </div>
            <div className="pub-urls">
                <a href="#" className="pub-icon">PDF</a>
                <a href="#" className="pub-icon">Code</a>
                <a href="#" className="pub-icon">arXiv</a>
            </div>
            <div className="decoLine"></div>
        </div>
        <div className="pub-content">
            <div className="pub-title">
                C.-Y. Lee and N. K. Jha, “FinCANON: A PVT-aware integrated delay and power modeling framework for FinFET-based caches and on-chip networks,” IEEE Trans. Very Large Scale Integration Systems, vol. 22, no. 5, May 2014, pp. 1150-1163.
            </div>
            <div className="pub-urls">
                <a href="#" className="pub-icon">PDF</a>
                <a href="#" className="pub-icon">Code</a>
                <a href="#" className="pub-icon">arXiv</a>
            </div>
            <div className="decoLine"></div>
        </div>
        <div className="pub-subj"><span className="color">C</span>onference Papers</div>
        <div className="pub-content">
            <div className="pub-title">
                C.-Y. Lee and N. K. Jha, “Variable-pipeline-stage router," IEEE Trans. Very Large Scale Integration Systems, vol. 21, no. 9, Sep. 2013, pp. 1669-1682.
            </div>
            <div className="pub-urls">
                <a href="#" className="pub-icon">PDF</a>
                <a href="#" className="pub-icon">Code</a>
                <a href="#" className="pub-icon">arXiv</a>
            </div>
            <div className="decoLine"></div>
        </div>
        <div className="pub-content">
            <div className="pub-title">
                C.-Y. Lee and N. K. Jha, “FinFET-based power simulator for interconnection networks," ACM Journal of Emerging Technologies in Computing Systems (JETC), vol. 6, no.1, Mar. 2010, pp. 2:1-2:18.
            </div>
            <div className="pub-urls">
                <a href="#" className="pub-icon">PDF</a>
                <a href="#" className="pub-icon">Code</a>
                <a href="#" className="pub-icon">arXiv</a>
            </div>
            <div className="decoLine"></div>
        </div>
    </div>
)

export default publicationMain;