import React from 'react';

export const Modal = ({ children, id  }) => (
    <div className="modal fade" id={id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <button className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

export const ModalButton = ({ children, className, modalId }) => (
    <button 
        className={className}
        data-toggle="modal" 
        data-target={`#${modalId}`}>
        {children}
    </button>
);