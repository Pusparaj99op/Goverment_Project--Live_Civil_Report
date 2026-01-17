'use client';

import { useState, useRef, useEffect } from 'react';
import {
    Box, IconButton, Paper, Typography, TextField, Button, Chip,
    Fab, Slide, Divider, Avatar, CircularProgress
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import TranslateIcon from '@mui/icons-material/Translate';
import Link from 'next/link';

const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' }
];

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [language, setLanguage] = useState('en');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Send initial greeting when chat opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            sendMessage('hi', true);
        }
    }, [isOpen]);

    const sendMessage = async (text, isSystem = false) => {
        if (!text.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: text,
            timestamp: new Date()
        };

        if (!isSystem) {
            setMessages(prev => [...prev, userMessage]);
        }
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    language,
                    sessionId
                })
            });

            const data = await response.json();

            if (!sessionId) {
                setSessionId(data.sessionId);
            }

            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: data.response,
                quickActions: data.quickActions,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: language === 'mr'
                    ? 'क्षमस्व, काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.'
                    : language === 'hi'
                        ? 'क्षमा करें, कुछ गलत हो गया। कृपया पुनः प्रयास करें।'
                        : 'Sorry, something went wrong. Please try again.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickAction = (action) => {
        if (action.link) {
            window.location.href = action.link;
        } else if (action.action) {
            sendMessage(action.action);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    return (
        <>
            {/* Chat FAB */}
            <Fab
                color="primary"
                onClick={() => setIsOpen(true)}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    display: isOpen ? 'none' : 'flex',
                    bgcolor: '#FF9933',
                    color: '#000',
                    '&:hover': { bgcolor: '#e68a00' },
                    zIndex: 1000,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
            >
                <ChatIcon />
            </Fab>

            {/* Chat Window */}
            <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                <Paper
                    elevation={10}
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        width: { xs: 'calc(100% - 48px)', sm: 380 },
                        height: { xs: 'calc(100% - 100px)', sm: 520 },
                        maxHeight: 600,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 2,
                        overflow: 'hidden',
                        zIndex: 1001
                    }}
                >
                    {/* Header */}
                    <Box sx={{
                        background: 'linear-gradient(135deg, #1a4e8e 0%, #0d2e5a 100%)',
                        color: '#fff',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ bgcolor: '#FF9933', width: 36, height: 36 }}>
                                <SmartToyIcon sx={{ color: '#000' }} />
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                                    UMRED Mitra
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                    AI Citizen Assistant
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {/* Language Selector */}
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                {languages.map(lang => (
                                    <Chip
                                        key={lang.code}
                                        label={lang.flag}
                                        size="small"
                                        onClick={() => setLanguage(lang.code)}
                                        sx={{
                                            bgcolor: language === lang.code ? '#FF9933' : 'rgba(255,255,255,0.2)',
                                            color: language === lang.code ? '#000' : '#fff',
                                            cursor: 'pointer',
                                            minWidth: 32,
                                            '&:hover': { bgcolor: language === lang.code ? '#e68a00' : 'rgba(255,255,255,0.3)' }
                                        }}
                                    />
                                ))}
                            </Box>
                            <IconButton onClick={() => setIsOpen(false)} sx={{ color: '#fff' }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Messages */}
                    <Box sx={{
                        flex: 1,
                        overflow: 'auto',
                        p: 2,
                        bgcolor: '#f5f5f5',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        {messages.map((msg) => (
                            <Box
                                key={msg.id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start'
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    gap: 1,
                                    flexDirection: msg.type === 'user' ? 'row-reverse' : 'row'
                                }}>
                                    <Avatar sx={{
                                        width: 28,
                                        height: 28,
                                        bgcolor: msg.type === 'user' ? '#1a4e8e' : '#FF9933'
                                    }}>
                                        {msg.type === 'user' ? <PersonIcon sx={{ fontSize: 16 }} /> : <SmartToyIcon sx={{ fontSize: 16, color: '#000' }} />}
                                    </Avatar>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            p: 1.5,
                                            maxWidth: '80%',
                                            bgcolor: msg.type === 'user' ? '#1a4e8e' : '#fff',
                                            color: msg.type === 'user' ? '#fff' : '#333',
                                            borderRadius: 2,
                                            whiteSpace: 'pre-wrap'
                                        }}
                                    >
                                        <Typography variant="body2">{msg.content}</Typography>
                                    </Paper>
                                </Box>

                                {/* Quick Actions */}
                                {msg.type === 'bot' && msg.quickActions && (
                                    <Box sx={{ mt: 1, ml: 4.5, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                        {msg.quickActions.map((action, i) => (
                                            <Chip
                                                key={i}
                                                label={action.label}
                                                size="small"
                                                onClick={() => handleQuickAction(action)}
                                                sx={{
                                                    bgcolor: '#e3f2fd',
                                                    cursor: 'pointer',
                                                    '&:hover': { bgcolor: '#bbdefb' }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        ))}

                        {isLoading && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 28, height: 28, bgcolor: '#FF9933' }}>
                                    <SmartToyIcon sx={{ fontSize: 16, color: '#000' }} />
                                </Avatar>
                                <CircularProgress size={20} />
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input */}
                    <Box sx={{
                        p: 2,
                        borderTop: '1px solid #ddd',
                        bgcolor: '#fff'
                    }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder={
                                    language === 'mr' ? 'तुमचा प्रश्न टाइप करा...'
                                        : language === 'hi' ? 'अपना प्रश्न टाइप करें...'
                                            : 'Type your question...'
                                }
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                            <IconButton
                                onClick={() => sendMessage(input)}
                                disabled={!input.trim() || isLoading}
                                sx={{
                                    bgcolor: '#FF9933',
                                    color: '#000',
                                    '&:hover': { bgcolor: '#e68a00' },
                                    '&:disabled': { bgcolor: '#ccc' }
                                }}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#999', display: 'block', mt: 1, textAlign: 'center' }}>
                            Powered by UMRED NEXUS AI
                        </Typography>
                    </Box>
                </Paper>
            </Slide>
        </>
    );
}
