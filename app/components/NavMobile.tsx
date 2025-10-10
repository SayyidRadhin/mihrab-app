import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { title: 'Home', url: '/' },
    { title: 'Courses', url: '/#courses' },
    { title: 'Apps', url: '/#learning-apps' },
    { title: 'About', url: '/#about' }
];

interface NavbarMobileAnimationProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
}

function NavbarMobileAnimation({ isMobileMenuOpen, setIsMobileMenuOpen }: NavbarMobileAnimationProps) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
        setIsMobileMenuOpen(!isMobileMenuOpen);
        // Prevent body scroll when menu is open
        if (!showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    const modalVariants = {
        hidden: {
            x: '100vw',
        },
        visible: {
            x: 0,
            transition: {
                type: 'tween',
                duration: 0.3,
            },
        },
        exit: {
            x: '100vw',
            transition: {
                type: 'tween',
                duration: 0.3,
            },
        },
    };
    const closeVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            },
        },
        exit: { opacity: 0, x: 50,
            transition: {
                duration: 0.1,
                ease: "easeOut"
            } }
    };              
    const linkItemVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            },
        },
        exit: {
            opacity: 0,
            x: 50,
            transition: {
                duration: 0.1,
                ease: "easeOut"
            }
        },
    };

    const navLinksVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
        exit: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    return (
        <div className="relative z-50 sm:hidden">
            <div 
                className='bg-S flex py-2  px-4 gap-6 bg-[#262364] rounded-full cursor-pointer' 
                onClick={toggleModal}
            >
                {showModal ? (
                    <>
                        <X color='white' size={20} />
                        <h6 className='text-white text-base font-light'>Close</h6>
                    </>
                ) : (
                    <>
                        <Menu color='white' size={20} />
                        <h6 className='text-white text-base font-light'>Menu</h6>
                    </>
                )}
            </div>
         
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed left-0 top-0 right-0 bottom-0 bg-primaryAccent z-40"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className="relative w-full h-full py-20 px-4 text-primaryAccent"
                            variants={navLinksVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className='absolute top-6 right-6'>
                            <motion.div 
                             variants={closeVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                                    className='bg-S flex py-2 px-4 gap-6 border border-white bg-primaryAccent rounded-full cursor-pointer' 
                                    onClick={toggleModal}
                                >
                                    <>
                                        <X color='white' size={20} />
                                        <h6 className='text-white text-base font-light'>Close</h6>
                                    </>
                                </motion.div>
            </div>
                            <div className="flex flex-col gap-8 items-center justify-center h-full">
                                {navLinks.map((link, index) => (
                                    <a href={link.url} key={index} onClick={toggleModal}>
                                        <motion.span 
                                            className="text-secondaryAccent font-bold text-4xl cursor-pointer" 
                                            variants={linkItemVariants}
                                        >
                                            {link.title}
                                        </motion.span>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default NavbarMobileAnimation;