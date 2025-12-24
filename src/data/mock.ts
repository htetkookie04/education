export interface EducationItem {
  id: string
  name: string
  institution: string
  startDate: string
  endDate: string
  status?: 'confirmed' | 'in-progress' | 'completed' | 'open' | 'available'
}

export const mockData = {
  myLectures: [] as EducationItem[],
  
  confirmed: [
    {
      id: '1',
      name: '디지털 마케팅 기초 과정',
      institution: '서울시 직업능력개발원',
      startDate: '2025-01-15',
      endDate: '2025-02-15',
      status: 'confirmed',
    },
    {
      id: '2',
      name: '웹 개발 실무 과정',
      institution: '부산시 교육원',
      startDate: '2025-02-01',
      endDate: '2025-03-01',
      status: 'confirmed',
    },
    {
      id: '3',
      name: '데이터 분석 입문 과정',
      institution: '대전시 인재개발원',
      startDate: '2025-02-10',
      endDate: '2025-03-10',
      status: 'confirmed',
    },
  ] as EducationItem[],
  
  inProgress: [
    {
      id: '4',
      name: '프로젝트 관리 실무',
      institution: '인천시 교육원',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      status: 'in-progress',
    },
    {
      id: '5',
      name: 'UI/UX 디자인 기초',
      institution: '광주시 직업능력개발원',
      startDate: '2025-01-10',
      endDate: '2025-02-10',
      status: 'in-progress',
    },
  ] as EducationItem[],
  
  completed: [
    {
      id: '6',
      name: 'Python 프로그래밍 기초',
      institution: '서울시 직업능력개발원',
      startDate: '2024-11-01',
      endDate: '2024-11-30',
      status: 'completed',
    },
    {
      id: '7',
      name: '클라우드 컴퓨팅 입문',
      institution: '부산시 교육원',
      startDate: '2024-10-15',
      endDate: '2024-11-15',
      status: 'completed',
    },
    {
      id: '8',
      name: '모바일 앱 개발',
      institution: '대전시 인재개발원',
      startDate: '2024-09-01',
      endDate: '2024-09-30',
      status: 'completed',
    },
    {
      id: '9',
      name: '데이터베이스 설계',
      institution: '인천시 교육원',
      startDate: '2024-08-15',
      endDate: '2024-09-15',
      status: 'completed',
    },
  ] as EducationItem[],
  
  openTraining: [
    {
      id: '10',
      name: 'AI 머신러닝 기초 과정',
      institution: '서울시 직업능력개발원',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      status: 'open',
    },
    {
      id: '11',
      name: '블록체인 개발 실무',
      institution: '부산시 교육원',
      startDate: '2025-03-15',
      endDate: '2025-04-15',
      status: 'open',
    },
    {
      id: '12',
      name: '사이버 보안 전문가 과정',
      institution: '대전시 인재개발원',
      startDate: '2025-04-01',
      endDate: '2025-04-30',
      status: 'open',
    },
    {
      id: '13',
      name: 'DevOps 실무 과정',
      institution: '인천시 교육원',
      startDate: '2025-04-15',
      endDate: '2025-05-15',
      status: 'open',
    },
    {
      id: '14',
      name: '프론트엔드 고급 과정',
      institution: '광주시 직업능력개발원',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
      status: 'open',
    },
  ] as EducationItem[],
  
  availableForApplication: [
    {
      id: '15',
      name: 'React 고급 개발 과정',
      institution: '서울시 직업능력개발원',
      startDate: '2025-06-01',
      endDate: '2025-06-30',
      status: 'available',
    },
    {
      id: '16',
      name: 'Node.js 백엔드 개발',
      institution: '부산시 교육원',
      startDate: '2025-06-15',
      endDate: '2025-07-15',
      status: 'available',
    },
    {
      id: '17',
      name: '마이크로서비스 아키텍처',
      institution: '대전시 인재개발원',
      startDate: '2025-07-01',
      endDate: '2025-07-31',
      status: 'available',
    },
  ] as EducationItem[],
  
  myApplications: [
    {
      id: '10',
      name: 'AI 머신러닝 기초 과정',
      institution: '서울시 직업능력개발원',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      status: 'open',
    },
    {
      id: '11',
      name: '블록체인 개발 실무',
      institution: '부산시 교육원',
      startDate: '2025-03-15',
      endDate: '2025-04-15',
      status: 'open',
    },
  ] as EducationItem[],
}


