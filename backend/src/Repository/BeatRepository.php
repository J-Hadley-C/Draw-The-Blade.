<?php

namespace App\Repository;

use App\Entity\Beat;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Beat>
 */
class BeatRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Beat::class);
    }

    /**
     * Find all beats ordered by creation date
     */
    public function findAllOrdered(): array
    {
        return $this->createQueryBuilder('b')
            ->orderBy('b.position', 'ASC')
            ->addOrderBy('b.id', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function findCarouselBeats(): array
    {
        return $this->createQueryBuilder('b')
            ->where('b.inCarousel = true')
            ->orderBy('b.position', 'ASC')
            ->addOrderBy('b.id', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function getMinPosition(): int
    {
        $result = $this->createQueryBuilder('b')
            ->select('MIN(b.position)')
            ->getQuery()
            ->getSingleScalarResult();
        return (int) ($result ?? 0);
    }

    /**
     * Find beats by genre
     */
    public function findByGenre(string $genre): array
    {
        return $this->createQueryBuilder('b')
            ->where('b.genre = :genre')
            ->setParameter('genre', $genre)
            ->orderBy('b.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Search beats by title
     */
    public function searchByTitle(string $query): array
    {
        return $this->createQueryBuilder('b')
            ->where('b.title LIKE :query')
            ->setParameter('query', '%' . $query . '%')
            ->orderBy('b.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
