import { ChatWidget } from './ChatWidget';
import { PartnerModal } from '../modals/PartnerModal';
import { LessonSettingsModal } from '../modals/LessonSettingsModal';
import { SyncDetailsModal } from '../modals/SyncDetailsModal';

export function GlobalOverlays() {
  return (
    <>
      <ChatWidget />
      <PartnerModal />
      <LessonSettingsModal />
      <SyncDetailsModal />
    </>);

}